import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import React from "react";
import { parseUSD } from "utils/usd";
import { truncateAddress } from "utils";
import Address from "components/Address";
import type { ReactElement } from "react";
import { formatDistance } from "date-fns";
import type { Prisma } from "@prisma/client";
import { Global, Currency } from "state/global";
import type { TradeWithTwitterUser } from "pages/api/stats/trades";

// Render row background depending on trade type
function ColoredRow({
  isBuy,
  children,
}: {
  isBuy: boolean;
  children: ReactElement[];
}) {
  return isBuy ? (
    <TableRow className="bg-buy-30">{children}</TableRow>
  ) : (
    <TableRow className="bg-sell-30">{children}</TableRow>
  );
}

export default function TradeTable({
  trades,
}: {
  trades: TradeWithTwitterUser[];
}) {
  const { eth, currency } = Global.useContainer();

  /**
   * Calculate cost of trade based on selected currency
   * @param {Prisma.Decima} cost from DB
   * @returns {string} formatted
   */
  const calculateTradeCost = (cost: Prisma.Decimal): string => {
    // Calculate trade cost
    return currency === Currency.USD
      ? `$${parseUSD((Number(cost) / 1e18) * eth)}`
      : `${(Number(cost) / 1e18).toFixed(6)} Ξ`;
  };

  const mockTrades = [
    {
      hash: "0x123abc",
      timestamp: 1632230400,
      blockNumber: 12345,
      fromAddress: "0xabc123",
      subjectAddress: "0xdef456",
      isBuy: true,
      amount: "1.234",
      cost: "1230000000000000000", 
      fromUser: {
        twitterUsername: 'ChuBeDo',
        twitterPfpUrl: 'đá thủ'
      },
      subjectUser: {
        twitterUsername: 'Trường kat',
        twitterPfpUrl:'thú đả'
      }
    },
    {
      hash: "0x456def",
      timestamp: 1632231400,
      blockNumber: 12346,
      fromAddress: "0xdef456",
      subjectAddress: "0xabc123",
      isBuy: false,
      amount: "2.345",
      cost: "2340000000000000000",
      fromUser: {
        twitterUsername: 'TuanCo',
        twitterPfpUrl: '1 cơ'
      },
      subjectUser: {
        twitterUsername: 'Phuonq Đông',
        twitterPfpUrl:'Bất hủ'
      }
    },
    // Thêm các đối tượng giao dịch khác vào đây...
  ];
  

  return (
    <Table className="min-w-[950px] [&_td]:py-1">
      <TableHeader className="sticky top-0">
        <TableRow>
          <TableHead>Hash</TableHead>
          <TableHead>Time Since</TableHead>
          <TableHead>Block #</TableHead>
          <TableHead>From</TableHead>
          <TableHead>Token</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Net</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        
        {mockTrades.map((trade, i) => {
          const tradeCost: string = calculateTradeCost(trade.cost);

          return (
            <ColoredRow isBuy={trade.isBuy} key={i}>
              <TableCell>
                <a
                  href={`https://basescan.org/tx/${trade.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {truncateAddress(trade.hash, 6)}
                </a>
              </TableCell>
              <TableCell suppressHydrationWarning={true}>
                {formatDistance(new Date(trade.timestamp * 1000), new Date(), {
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell>
                <a
                  href={`https://basescan.org/block/${trade.blockNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {trade.blockNumber}
                </a>
              </TableCell>
              <TableCell>
                <Address
                  address={trade.fromAddress}
                  username={trade.fromUser.twitterUsername}
                  image={trade.fromUser.twitterPfpUrl}
                />
              </TableCell>
              <TableCell>
                <Address
                  address={trade.subjectAddress}
                  username={trade.subjectUser.twitterUsername}
                  image={trade.subjectUser.twitterPfpUrl}
                />
              </TableCell>
              <TableCell>
                {trade.isBuy ? "+" : "-"}
                {trade.amount}
              </TableCell>
              <TableCell>
                {trade.isBuy ? (
                  <span className="text-buy">{tradeCost}</span>
                ) : (
                  <span className="text-sell">{tradeCost}</span>
                )}
              </TableCell>
            </ColoredRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
