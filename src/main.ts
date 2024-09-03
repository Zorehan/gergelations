import { ModCallback } from "isaac-typescript-definitions";
import { getNPCs, getPlayers, getRandomInt } from "isaacscript-common";

const MOD_NAME = "gergelations";
const GREEN_CANDLE_COLLECTIBLE_TYPE = Isaac.GetItemIdByName("Green Candle");



export function main(): void {

  const mod = RegisterMod(MOD_NAME, 1);
  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate);

  // Print a message to the "log.txt" file.
  Isaac.DebugString(`${MOD_NAME} initialized.`);
}

function postUpdate()
{
  checkApplyGreenCandleEffect();
  Isaac.DebugString("A game frame just passed.");
}

function checkApplyGreenCandleEffect()
{
  for (const player of getPlayers())
  {
    if(player.HasCollectible(GREEN_CANDLE_COLLECTIBLE_TYPE))
    {
      applyGreenCandleEffect(player);
    }
  }
}

function applyGreenCandleEffect(player: EntityPlayer)
{
  for (const npc of getNPCs())
  {
    if(shouldApplyGreenCandleEffectToNPC(npc))
      npc.AddPoison(EntityRef(player), 100, player.Damage);
  }
}

function shouldApplyGreenCandleEffectToNPC(npc: EntityNPC)
{
  return npc.IsVulnerableEnemy() && getRandomInt(1, 100, undefined) === 1;
}
function postPlayerInit() {
  Isaac.DebugString("Callback fired: POST_PLAYER_INIT");
}
