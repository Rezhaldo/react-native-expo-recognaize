import { CorrectCircleIcon, WrongCircleIcon } from "@/assets/icons";
import { Text } from "@/components";
import React, { useEffect, useMemo, useState } from "react";
import { Image, type ImageSourcePropType, Modal, StyleSheet, TouchableOpacity, View } from "react-native";

// Hardcoded notes and coins
const HUNDREDS = [20, 10, 5, 2, 1];
const CENTS = [0.5, 0.2, 0.1];

// Map each denomination to local image
const MONEY_ASSETS: Record<number, ImageSourcePropType> = {
    20: require("@/assets/icons/cashier-shop/20.png"),
    10: require("@/assets/icons/cashier-shop/10.png"),
    5: require("@/assets/icons/cashier-shop/5.png"),
    2: require("@/assets/icons/cashier-shop/2.png"),
    1: require("@/assets/icons/cashier-shop/100-cent.png"),
    0.5: require("@/assets/icons/cashier-shop/50-cent.png"),
    0.2: require("@/assets/icons/cashier-shop/20-cent.png"),
    0.1: require("@/assets/icons/cashier-shop/10-cent.png"),
};

interface Props {
    budget: number; // e.g., 27.30
}

export function CashierGame({ budget }: Props) {
    const [cash, setCash] = useState<Record<number, number>>(
        Object.fromEntries([...HUNDREDS, ...CENTS].map((denomination) => [denomination, 0]))
    );
    const [addedMoney, setAddedMoney] = useState<number[]>([]); // sequence of unique denominations in top container
    const [result, setResult] = useState<"success" | "error" | null>(null);

    const { hundreds, cents } = useMemo(() => getAmount(budget), [budget]);

    // Auto-hide result after 1s
    useEffect(() => {
        if (result) {
            const t = setTimeout(() => setResult(null), 1000);
            return () => clearTimeout(t);
        }
    }, [result]);

    const handleAddMoney = (denomination: number) => {
        setCash((prev) => ({ ...prev, [denomination]: prev[denomination] + 1 }));
        // Only add to sequence if not already present
        if (!addedMoney.includes(denomination)) {
            setAddedMoney((prev) => [...prev, denomination]);
        }
    };

    const handleRemoveMoney = (denomination: number) => {
        setCash((prev) => {
            const newCash = { ...prev, [denomination]: prev[denomination] - 1 };
            return newCash;
        });
        // Remove from sequence only if count reaches 0
        if (cash[denomination] === 1) {
            setAddedMoney((prev) => prev.filter((m) => m !== denomination));
        }
    };

    return (
        <View style={styles.container}>
            {/* Overlay success / error */}
            <Modal transparent visible={!!result} animationType="fade">
                <View style={styles.overlay}>
                    {result === "success" ? (
                        <CorrectCircleIcon width={180} height={180} />
                    ) : (
                        <WrongCircleIcon width={180} height={180} />
                    )}
                </View>
            </Modal>

            {/* Required amount */}
            <View style={styles.requiredAmountContainer}>
                <Text style={styles.requiredAmount}>
                    ${/* biome-ignore lint/style/useTemplate: <explanation> */}
                    {hundreds}.{cents < 10 ? "0" + cents : cents}
                </Text>
                {addedMoney.length > 0 && <Text>Tap on the note or coin to remove it.</Text>}
            </View>

            {/* Added money container */}
            <View style={styles.addedMoneyContainer}>
                {addedMoney.map((denomination) => (
                    <TouchableOpacity
                        key={denomination}
                        style={styles.moneyItem}
                        onPress={() => handleRemoveMoney(denomination)}
                    >
                        <Image
                            source={MONEY_ASSETS[denomination]}
                            style={denomination >= 2 ? styles.noteImage : styles.coinImage}
                        />
                        {cash[denomination] > 1 && <Highlight num={cash[denomination]} />}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Notes / Coins stash */}

            <View style={[styles.moneyContainer]}>
                {[...HUNDREDS, ...CENTS].map((denomination) => (
                    <TouchableOpacity
                        key={denomination}
                        style={[styles.moneyItem, { backgroundColor: "#303A43", borderRadius: 8 }]}
                        onPress={() => handleAddMoney(denomination)}
                    >
                        <Image
                            source={MONEY_ASSETS[denomination]}
                            style={denomination >= 2 ? [styles.noteImage] : [styles.coinImage,]}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Submit button */}
            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                    const total = Object.entries(cash).reduce(
                        (sum, [key, value]) => sum + Number(key) * value,
                        0
                    );
                    if (Math.abs(total - (hundreds + cents / 100)) < 0.001) setResult("success");
                    else setResult("error");
                }}
            >
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

function Highlight({ num }: { num: number }) {
    return (
        <View style={styles.highlight}>
            <Text style={styles.highlightText}>{num}</Text>
        </View>
    );
}

function getAmount(budget: number) {
    const hundreds = Math.floor(budget);
    const cents = Math.round((budget % 1) * 100);
    return { hundreds, cents };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "space-between",
    },
    requiredAmountContainer: {
        alignItems: "center",
        marginBottom: 16,
    },
    requiredAmount: {
        fontSize: 32,
        fontWeight: "bold",
        backgroundColor: "#34373A",
        color: "#FFF",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    addedMoneyContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 8,
        maxHeight: 200,
        marginBottom: 16,
        flex: 1,
    },
    moneyContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 8,
        maxHeight: 200,
        marginBottom: 16,
        flex: 1,
        padding: 4,
        borderRadius: 8,
        backgroundColor: "#787878",
    },
    moneyItem: {
        position: "relative",
        margin: 4,
    },
    noteImage: {
        width: 64,
        height: 180,
        resizeMode: "contain",
    },
    coinImage: {
        width: 48,
        height: 64,
        resizeMode: "contain",
    },
    highlight: {
        position: "absolute",
        top: -6,
        right: -6,
        backgroundColor: "orange",
        borderRadius: 8,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    highlightText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    submitButton: {
        backgroundColor: "#FE8E44",
        paddingVertical: 12,
        borderRadius: 32,
        alignItems: "center",
        marginTop: 16
    },
    submitText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
