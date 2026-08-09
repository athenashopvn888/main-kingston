import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const chat = await readFile(new URL("../app/delivery/MainKingstonWebChat.tsx", import.meta.url), "utf8");
const delivery = await readFile(new URL("../app/delivery/DeliveryContent.tsx", import.meta.url), "utf8");

for (const expected of [
  'storeId: "MK"',
  'sod-web-chat:MK',
  'smsConsent',
  'required type="checkbox"',
  'Reply YES to confirm',
  '/api/web-chat/session',
  '/api/web-chat/messages',
  '/api/web-chat/id-review',
  'NEW_CUSTOMER',
  'RETURNING_CUSTOMER',
]) assert.ok(chat.includes(expected), `Missing Web Chat contract: ${expected}`);

assert.ok(delivery.includes("<MainKingstonWebChat />"), "Delivery page must render Main Kingston Cannabis Web Chat");
assert.ok(!chat.includes('storeId: "PC"') && !chat.includes("sod-web-chat:PC"), "Reference store identity must not remain");
console.log("Main Kingston Cannabis consent Web Chat contract passed.");
