import constants from "../utils/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { StateUser, Currency } from "./global";

export function useGlobal(initialState: StateUser = constants.COBIE) {
// Routing
const { push } = useRouter();

// Default: @cobie
const [user, setUser] = useState<StateUser>(initialState);
// Currency
const [currency, setCurrency] = useState<Currency>(Currency.ETH);
// ETH Price
const [eth, setEth] = useState<number>(0);
// Favorites
const [favorites, setFavorites] = useState<Record<string, StateUser>>({});

// On page load
useEffect(() => {
// Load eth price
// async function collectEthPrice() {
//   const { data } = await axios.get("/api/eth");
//   setEth(data);
},
collectEthPrice());

// Load favorites from local storage
const localFavorites = localStorage.getItem("friendmex_favorites");
if (localFavorites) setFavorites(JSON.parse(localFavorites));
}
