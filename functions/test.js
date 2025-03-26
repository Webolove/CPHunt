const { sendReminderLogic } = require("./index");

sendReminderLogic()
  .then(() => {
    console.log("✅ Reminder test run completed.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
