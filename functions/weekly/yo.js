const propertyId = 250791696;
// const propertyId = 238756690;

process.env.GOOGLE_APPLICATION_CREDENTIALS =
  "/Users/lars/dev/analytics-bot-2/key.json";

const { AlphaAnalyticsDataClient } = require("@google-analytics/data");

const client = new AlphaAnalyticsDataClient();

const { format, subDays, addDays } = require("date-fns");
// Runs a simple report.
async function lastWeekActiveUsers() {
  const from = subDays(new Date(), 7);
  const to = new Date();

  const [response] = await client.runReport({
    entity: {
      propertyId: propertyId,
    },
    dateRanges: [
      {
        startDate: format(from, "yyyy-MM-dd"),
        endDate: format(to, "yyyy-MM-dd"),
        name: "week",
      },
    ],
    dimensions: [
      {
        name: "nthDay",
      },
    ],
    metrics: [
      {
        name: "activeUsers",
      },
    ],
  });

  const data = response.rows
    .map((row) => ([
      parseInt(row.dimensionValues[0].value),
      parseInt(row.metricValues[0].value),
    ]))
    .sort(([ax],[bx]) => ax - bx)
    .map(([day, value]) => ([
      format(addDays(from, day), "yyyy-MM-dd"),
      value
    ]))

  console.log("Last week: ");
  console.log(data)
  return data
}

// lastWeekActiveUsers();

module.exports ={
  lastWeekActiveUsers:lastWeekActiveUsers
}