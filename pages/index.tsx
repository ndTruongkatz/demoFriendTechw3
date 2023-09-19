// pages/index.tsx (hoặc các trang khác)
import React from "react";
import dynamic from "next/dynamic";
import Image from 'next/image'
import { WidthProvider, Responsive } from "react-grid-layout";
import  Header from '../components/Header'
import Layout from "../components/Layout"; 
import type { StateUser } from "../state/global";
import type { NextPageContext } from "next";
import constants from "../utils/constants";
import { getStateUser } from "./api/user";

// Trading views
import Chart from "../components/trading/Chart";

import { Global } from "../state/global";

const ResponsiveGridLayout = WidthProvider(Responsive);
const BuySell = dynamic(() => import("../components/trading/BuySell"), {
  ssr: false,
});
const Holdings = dynamic(() => import("../components/trading/Holdings"), {
  ssr: false,
});


function Home({user}: { user: StateUser;}) {
  const layout = {
    md: [
      { i: "chart", x: 0, y: 0.6, w: 24, h: 3 },
      { i: "discover", x: 6.6, y: 0, w: 24, h: 3 },
      { i: "holdings", x: 21.6, y: 24, w: 24, h: 3 },
      { i: "favorites", x: 21.6, y: 24, w: 24, h: 3 },
      { i: "recent_trades", x: 9.6, y: 0, w: 24, h: 3 },
      { i: "buy_sell", x: 3.6, y: 0, w: 24, h: 3 },
      { i: "recent_token_trades", x: 12, y: 0, w: 24, h: 3 },
      { i: "realized_profit", x: 15.6, y: 0, w: 24, h: 3 },
      { i: "newest_users", x: 18.6, y: 0, w: 24, h: 3 },
    ],
    lg: [
      { i: "chart", x: 0, y: 0, w: 15, h: 3 },
      { i: "buy_sell", x: 20, y: 0, w: 8, h: 3 },
      { i: "discover", x: 28, y: 0, w: 8, h: 3 },
      { i: "recent_trades", x: 0, y: 6, w: 28, h: 3 },
      { i: "favorites", x: 28, y: 6, w: 8, h: 3 },
      { i: "recent_token_trades", x: 0, y: 12, w: 25, h: 3 },
      { i: "realized_profit", x: 18, y: 18, w: 9, h: 3 },
      { i: "newest_users", x: 27, y: 18, w: 11, h: 3 },
      { i: "holdings", x: 0, y: 24, w: 36, h: 3 },
    ],
  };

  return (
    <Layout user={user}>
      <ResponsiveGridLayout  
        layouts={layout}
        draggableHandle=".drag-handle"
        cols={{ lg: 36, md: 24, sm: 12, xs: 6, xxs: 3 }}
      >

      {/* Discover */}
      <div key="discover">
          {/* <Discover leaderboard={leaderboardUsers} /> */}
          Discover
      </div>

      {/* Trading chart */}
      <div key="chart">
        <Chart />
      </div>
      
      {/* Buy + Sell controller */}
      <div key="buy_sell">
          <BuySell />
      </div>

      {/* Recent trades */}
      <div key="recent_trades">
          {/* <RecentTrades trades={latestTrades} /> */}
          recent_trades
      </div>

      {/* Favorites */}
      <div key="favorites">
          {/* <Favorites /> */}
          Favorites
      </div>

      {/* Recent token trades */}
      <div key="recent_token_trades">
          {/* <RecentTokenTrades /> */}
          RecentTokenTrades
      </div>

      {/* Newest users */}
      <div key="newest_users">
          {/* <NewestUsers users={newestUsers} /> */}
          NewestUsers
      </div>

      </ResponsiveGridLayout>
    </Layout>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  // Collect query params
  let { address } = ctx.query;
  // If array, select first
  if (Array.isArray(address)) {
    address = address[0];
  }

  let user: StateUser;
  try {
    // If no address throw
    if (!address) throw new Error("No address found");

    // Collect user by address
    user = await getStateUser(address);
  } catch {
    // If error, default to Cobie
    user = constants.COBIE;
  }

  // Collect data
  // const newestUsers = await getNewestUsers();
  // const latestTrades = await getLatestTrades();
  // const leaderboardUsers = await getLeaderboardUsers();
  // const realizedProfit = await getRealizedProfits();

  return {
    props: {
      // newestUsers,
      // latestTrades,
      // leaderboardUsers,
      // realizedProfit,
      user,
    },
  };
}

export default Home;
