const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "cphunt-d3fca" // Project id (hardcoded before deployment)
});

const db = admin.firestore();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        //This won't work. Put hardcoded values for now. It will only work after deployment. 
        // For storing your sensetive data 
        // cd ./functions 
        // firebase functions:config:set gmail.user="your_gmail" gmail.pass="your_gmail_app_password"

        user: functions.config().gmail.user, // admin's gmail (Hard Code)
        pass: functions.config().gmail.pass // admin's gmail "App password" for gmail -- generate (Hard Code)
    }

});
async function sendReminderLogic() {
    const usersSnapshot = await db.collection("users").get();
    const now = new Date();
  
    for (const docSnap of usersSnapshot.docs) {
      const user = docSnap.data();
      const email = user.email;
      const bookmarks = user.bookmarked || [];
  
      let updated = false;
  
      for (let contest of bookmarks) {
        if (!contest.date || !contest.time || contest.notified) continue;
  
        const [month, day, year] = contest.date.split("/");
        const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        const contestTime = new Date(`${isoDate} ${contest.time}`);
        const diffInMinutes = (contestTime - now) / 60000;
  
        if (diffInMinutes > 0 && diffInMinutes <= contest.reminderTime) {
          await transporter.sendMail({
            from: "2710rismi@email.com", //this is my email. Remove and set admin email here.
            to: email,
            subject: `Reminder: ${contest.name}`,
            text: `Your bookmarked contest "${contest.name}" starts at ${contest.date} ${contest.time}.`,
          });
  
          contest.notified = true;
          updated = true;
        }
      }
  
      if (updated) {
        await db.collection("users").doc(docSnap.id).update({ bookmarked: bookmarks });
      }
    }
  }
  exports.sendReminderLogic = sendReminderLogic;
  