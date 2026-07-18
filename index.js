const handleCommand = require("./handler");
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require("pino");

async function startBot() {

    const { state, saveCreds } = await useMultiFileAuthState("./session");

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" })
    });

    sock.ev.on("creds.update", saveCreds);
sock.ev.on("messages.upsert", async ({ messages }) => {

    const msg = messages[0];

    if (!msg.message) return;

    await handleCommand(sock, msg);

});
    sock.ev.on("connection.update", ({ connection, qr }) => {

        if (qr) {
            console.log("Scan this QR:", qr);
        }

       
