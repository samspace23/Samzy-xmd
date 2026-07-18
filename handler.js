const config = require("./config");

async function handleCommand(sock, msg) {
    const text = msg.message?.conversation || "";

    if (!text.startsWith(config.PREFIX)) return;

    const command = text.slice(config.PREFIX.length).trim().toLowerCase();

    if (command === "ping") {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🏓 Pong!"
        });
    }
}

module.exports = handleCommand;
