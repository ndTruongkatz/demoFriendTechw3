// import db from "prisma/index";
// import cache from "utils/cache";
import type { StateUser } from "../../state/global";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Collects StateUser object for address or throws
 * @param {string} address to collect
 * @returns {Promise<StateUser>}
 */
export async function getStateUser(address: string): Promise<StateUser> {
  // Force lowercase
  const lowerAddress: string = address.toLowerCase();

  // Setup user
  const user: StateUser = {
    address: lowerAddress,
    image:'',
    username:'kat',
  };

  // Return data
  return user;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // Collect address from body
  let { address } = req.query;
  // Throw if missing parameter
  if (!address) return res.status(400).json({ error: "Missing address" });
  if (!Array.isArray(address)) address = [address];

  try {
    // Check for users
    const requests = address.map((addr) => getStateUser(addr.toLowerCase()));
    const results = await Promise.allSettled(requests);
    let fulfilled = [];
    for (const res of results) {
      if (res.status === "fulfilled") fulfilled.push(res.value);
    }

    return res.status(200).json(fulfilled);
  } catch (e: unknown) {
    // Catch errors
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }

    // Return default error
    return res.status(500).json({ message: "Internal server error" });
  }
}
