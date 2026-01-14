import { useSession } from "@/app/ctx";
import { Text } from "@/components";
import { Container, TextStyle } from "@/shared";
import { Fragment, useEffect, useState } from "react";
import { View } from "react-native";

import { useGameSounds } from "@/shared/hooks/useGameSounds";
import { DemoOverlay, type DemoOverlayProps } from "../component/DemoOverlay";
import { DisplayedSymbol } from "../component/DisplayedSymbols";
import { NumberPad } from "../component/NumberPad";
import { Score } from "../component/Score";
import {
    IconList,
    SymbolsList,
    genRandomIconList,
} from "../component/SymbolsList";
import { matchingSymbolDemoSteps } from "../component/demoSteps";
import { matchingSymbolAssets } from "../component/utils";
import { useMatchingDemo } from "../hooks/use-matching-demo";

import { CorrectCircleIcon, WrongCircleIcon } from "@/assets/icons";
import { GameTimer } from "../component/GameTimer";
import styles from "./styles";

type FeedbackType = "correct" | "wrong" | null;
type GameMode = "tutorial" | "loading" | "gameplay";
type GameStatus = "idle" | "running" | "finished";


export function MatchingSymbol() {
    const textStyle = TextStyle();
    const { session } = useSession();
    const { playCorrect, playWrong } = useGameSounds();

    const [randomList, setRandomList] = useState<number[]>([]);
    const [targetIndex, setTargetIndex] = useState<number>(6); // icon index
    const [targetGridIndex, setTargetGridIndex] = useState<number>(6); // grid position
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<FeedbackType>(null);
    const [mode, setMode] = useState<GameMode>("tutorial");
    const [gameStatus, setGameStatus] = useState<GameStatus>("idle");


    const demo = useMatchingDemo(matchingSymbolDemoSteps);

    const isGameplay = mode === "gameplay";


    const overlayConfig: DemoOverlayProps | null =
        (() => {
            switch (demo.step?.type) {
                case "focus-main-symbol":
                    return {
                        text: "Focus on the symbol at the top of the screen.",
                        placement: "top",
                    };
                case "focus-symbol":
                    return {
                        text: "Look for the matching symbol and its number. Here, it is 6.",
                        placement: "center",
                        isPrevious: true,
                    };
                case "press-number":
                    return {
                        text: "Tap “6” in the number pad below.",
                        placement: "bottom",
                        isPrevious: true,
                        isNextBlocked: true,
                    };
                case "reminder":
                    return {
                        text:
                            "Be careful, the order of the symbols will change after every turn.",
                        placement: "center",
                    };
                case "user-confirmation":
                    return {
                        text: "Now try out the next 3 rounds by yourself!",
                        placement: "center",
                        isPrevious: true,
                    };
                case "end":
                    return {
                        text: "Great job! Now it’s time to take the actual test.",
                        placement: "center",
                        isPrevious: true,
                    };
                default:
                    return null;
            }
        })();


    const handlePress = (num: string) => {

        const correctValue = String(targetGridIndex);

        // 🔥 REAL GAMEPLAY — NO DEMO LOGIC
        if (mode === "gameplay") {
            if (num === correctValue) {
                onCorrectAnswer();
            } else {
                onWrongAnswer();
            }
            return;
        }

        // 👇 EVERYTHING BELOW IS TUTORIAL ONLY
        if (demo.step?.type === "reminder") return;

        if (demo.step?.type === "press-number") {
            if (num === demo.step.value) {
                onCorrectAnswer();
                demo.next();
            } else {
                onWrongAnswer();
            }
            return;
        }

        if (demo.step?.type === "free-play") {
            if (num === correctValue) {
                onCorrectAnswer();
            } else {
                onWrongAnswer();
            }
        }
    };


    const onCorrectAnswer = () => {
        playCorrect()
        setScore((s) => s + 1);
        setFeedback("correct");

        // ✅ REAL GAMEPLAY → ALWAYS SHUFFLE
        if (mode === "gameplay") {
            shuffleBoard();
            return;
        }

        // ✅ TUTORIAL FREE-PLAY
        if (demo.step?.type === "free-play") {
            shuffleBoard();
            demo.registerFreePlaySuccess();
        }
    };

    const onWrongAnswer = () => {
        playWrong();
        setFeedback("wrong");

        if (mode === "gameplay") {
            setScore((s) => Math.max(0, s - 1)); // 👈 no negative score
        }
    };

    const shuffleBoard = () => {
        const newTarget = Math.floor(Math.random() * 10);
        const newList = genRandomIconList(10, false);
        const newGridIndex = newList.findIndex((i) => i === newTarget);

        setTargetIndex(newTarget);
        setRandomList(newList);
        setTargetGridIndex(newGridIndex);
    };

    const resetGame = () => {
        const newTarget = Math.floor(Math.random() * 10);
        const newList = genRandomIconList(10, false);
        const newGridIndex = newList.findIndex((i) => i === newTarget);

        setScore(0);
        setFeedback(null);

        setTargetIndex(newTarget);
        setTargetGridIndex(newGridIndex);
        setRandomList(newList);
    };

    const handleFinishTutorial = () => {
        setMode("loading");

        setTimeout(() => {
            resetGame();
            setMode("gameplay");
            setGameStatus("running"); // 🔥 START GAME
        }, 1200); // ⏳ loading duration
    };

    const handleGameEnd = () => {
        setGameStatus("finished");

        // 🔒 lock input
        // (handled in handlePress)

        submitScore();
    };

    const submitScore = async () => {
        const payload = {
            score,
            duration: 60,
            game: "matching-symbol",
            sessionId: 'session?.id',
        };

        console.log("📤 Submitting score:", payload);

        // TODO:
        // await api.submitGameResult(payload)
        // navigation.navigate("Result", payload)
    };


    useEffect(() => {
        if (mode !== "tutorial") return;

        const list = genRandomIconList(10, false);
        list[6] = 6;

        setTargetIndex(6);
        setTargetGridIndex(6);
        setRandomList(list);
    }, [mode]);


    useEffect(() => {
        if (!feedback) return;

        const t = setTimeout(() => {
            setFeedback(null);
        }, 700);

        return () => clearTimeout(t);
    }, [feedback]);



    if (mode === "loading") {
        return (
            <Container gradientTheme="matching-symbol">
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text font="plusJakartaBold" style={textStyle.medium}>
                        Preparing the challenge…
                    </Text>
                </View>
            </Container>
        );
    }


    return (
        <Container gradientTheme="matching-symbol">
            <View style={styles.spacer} />

            <View style={styles.headerContainer}>
                <Score score={score} />
                {mode === "gameplay" ? (
                    <GameTimer
                        duration={60}
                        isRunning={gameStatus === "running"}
                        onFinish={() => {
                            console.log("⏰ Time's up");
                            // TODO: end game / submit score
                        }}
                    />
                ) : (
                    <Text
                        font="plusJakartaBold"
                        style={[textStyle.small, styles.demoTitle]}
                    >
                        Demo
                    </Text>
                )}

            </View>

            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    marginTop: 16,
                    justifyContent: "space-evenly",
                }}
            >
                <Fragment>
                    <DisplayedSymbol
                        src={
                            matchingSymbolAssets[
                            IconList[targetIndex] as keyof typeof matchingSymbolAssets
                            ]
                        }
                        activeEle={targetIndex}
                        highlight={
                            demo.step?.type === "focus-main-symbol"
                        }
                        refreshKey={targetIndex}
                    />
                </Fragment>

                {feedback && (
                    <View
                        style={{
                            position: "absolute",
                            top: "30%",
                            zIndex: 10,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        pointerEvents="none"
                    >
                        {feedback === "correct" ? (
                            <CorrectCircleIcon width={150} height={150} />
                        ) : (
                            <WrongCircleIcon width={150} height={150} />
                        )}
                    </View>
                )}

                <SymbolsList
                    randomList={randomList}
                    highlightIndex={
                        demo.step?.type === "focus-symbol"
                            ? targetGridIndex
                            : undefined
                    }
                />

                <NumberPad
                    onPress={handlePress}
                    highlightedValue={
                        demo.step?.type === "press-number"
                            ? demo.step.value
                            : undefined
                    }
                />

                {mode === "tutorial" && overlayConfig && (
                    <DemoOverlay
                        text={overlayConfig.text}
                        placement={overlayConfig.placement}
                        onNext={
                            demo.step?.type === "end"
                                ? handleFinishTutorial
                                : demo.next
                        } onPrevious={demo.prev}
                        isPrevious={overlayConfig.isPrevious}
                        isNextBlocked={overlayConfig.isNextBlocked}
                    />
                )}
            </View>
        </Container>
    );
}
