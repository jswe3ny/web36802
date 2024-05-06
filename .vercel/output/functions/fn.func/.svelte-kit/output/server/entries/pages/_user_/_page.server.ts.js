import { r as redirect, f as fail } from "../../../chunks/index.js";
import { d as db, b as buyTable, A as API_KEY } from "../../../chunks/db.js";
import { eq } from "drizzle-orm";
const load = async ({ locals }) => {
  if (!locals.user) {
    redirect(307, "/auth/login");
  }
  const res = await db.query.buyTable.findMany({
    where: eq(buyTable.userId, locals.user.id)
  });
  let displayData = [];
  const getEPS = async (ticker, date) => {
    const res2 = await fetch(`https://financialmodelingprep.com/api/v3/income-statement/${ticker}?period=annual&apikey=${API_KEY}`);
    const data = await res2.json();
    const dataLength = data.length - 1;
    for (let i = 0; i <= dataLength; i++) {
      const reportFileDate = new Date(data[i].date);
      const dateDifference = reportFileDate.getTime() - date.getTime();
      const dateDifferenceInDays = Math.floor(dateDifference / (1e3 * 60 * 60 * 24));
      if (reportFileDate < date && i == dataLength - 1) {
        console.log(data[i].symbol + " that data hasnt been released, using last years data. EPS: " + data[i - 1].eps);
        return {
          message: "data hasn't been reported yet, using last years numbers",
          eps: Number(data[i - 1].eps)
        };
      }
      if (reportFileDate > date && dateDifferenceInDays < 362) {
        return {
          message: "success",
          eps: Number(data[i].eps)
        };
      }
    }
    return {
      error: "data only goes back 5 years",
      eps: 0
    };
  };
  const calcPE = (costPerShare, eps) => {
    let pe = costPerShare / eps;
    if (pe < 0) {
      return 0;
    }
    return pe;
  };
  for (let i = 0; i < res.length; i++) {
    const currentTicker = res[i].ticker;
    const costPerShare = Number(res[i].costPerShare);
    const numShares = res[i].numShares;
    const date = res[i].buyDate;
    const localTotalCost = costPerShare * numShares;
    const eps = await getEPS(res[i].ticker, date);
    let pe = calcPE(costPerShare, eps.eps);
    let locationInArray = displayData.findIndex((obj) => obj?.ticker == currentTicker);
    if (locationInArray == -1) {
      if (!isFinite(pe)) {
        pe = 0;
      }
      displayData.push({ ticker: currentTicker, info: {
        pe,
        averagePE: parseFloat(pe.toFixed(2)),
        totalCost: localTotalCost,
        numShares
      } });
    }
    if (displayData[locationInArray]) {
      if (pe <= 0 || !isFinite(pe)) {
        continue;
      }
      const updateInfo = displayData[locationInArray].info;
      displayData[locationInArray].info.numShares += numShares;
      displayData[locationInArray].info.totalCost = updateInfo.totalCost += localTotalCost;
      displayData[locationInArray].info.averagePE = parseFloat(((updateInfo.averagePE * (updateInfo.numShares - numShares) + pe * numShares) / updateInfo.numShares).toFixed(2));
    }
  }
  return { displayData };
};
const actions = {
  default: async (event) => {
    if (!event.locals.user) {
      redirect(307, "/auth/login");
    }
    const formdata = await event.request.formData();
    let ticker = formdata.get("ticker");
    const numShares = Number(formdata.get("numShares"));
    const buyDate = formdata.get("buyDate")?.toString();
    let costPerShare = formdata.get("costPerShare");
    let tickerUpperCase = "" + ticker;
    tickerUpperCase = tickerUpperCase.toUpperCase();
    let request = await fetch("https://www.sec.gov/files/company_tickers.json");
    let cik = await request.json();
    let cikNumber = "";
    for (let i = 0; i < Object.keys(cik).length; i++) {
      if (cik[i].ticker == tickerUpperCase) {
        cikNumber += cik[i].cik_str;
        console.log(cik[i]);
        while (cikNumber.length < 10) {
          cikNumber = "0" + cikNumber;
        }
        break;
      }
    }
    if (!cikNumber) {
      console.log("Ticker fail");
      return fail(400, {
        message: "Invalid Ticker"
      });
    }
    if (!numShares || typeof numShares !== "number") {
      console.log("numshares fail");
      return fail(400, {
        message: "Invalid number of shares"
      });
    }
    if (!costPerShare || !/^-?\d+(\.\d{1,2})?$/.test(costPerShare.toString())) {
      console.log("fail cost per share");
      return fail(400, {
        message: "Invalid cost per share"
      });
    }
    if (!buyDate) {
      return fail(400, {
        message: "no date"
      });
    }
    costPerShare = costPerShare.toString();
    const date = new Date(buyDate);
    await db.insert(buyTable).values({
      userId: event.locals.user.id,
      ticker: tickerUpperCase,
      numShares,
      buyDate: date,
      cik: cikNumber,
      costPerShare
    });
  }
};
export {
  actions,
  load
};
