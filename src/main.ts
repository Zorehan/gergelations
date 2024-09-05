import { ModCallback, type FamiliarVariant } from "isaac-typescript-definitions";
import { getNPCs, getPlayers, getRandomInt, ModCallbackCustom } from "isaacscript-common";

const MOD_NAME = "Gergelations";
const GREEN_CANDLE_COLLECTIBLE_TYPE = Isaac.GetItemIdByName("Green Candle");
const ANGELIC_BABY_COLLECTIBLE_TYPE = Isaac.GetItemIdByName("Angelic Baby");


const ANGELIC_BABY_VARIANT = Isaac.GetEntityVariantByName("Angelic Baby");

let angelicBaby: Entity | null = null;

let angelicBabyPlayMovie = -1;
let entities: Entity[] = [];

let chestPickupCount = 0;

const playerDistance = 90;
const pickupDistance = 150;
const collisionDistance = 30;

let modRunning = false;


export function main() {
  const mod = RegisterMod(MOD_NAME, 1);

  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate);
  mod.AddCallback(ModCallback.POST_UPDATE, postUpdateforAngelicBaby);
  mod.AddCallback(ModCallback.POST_FAMILIAR_UPDATE(angelicbabyUpdate, ANGELIC_BABY_VARIANT))

  Isaac.DebugString(`${MOD_NAME} initialized.`);
}

function postUpdate() {
  checkApplyGreenCandleEffect();
}

function postUpdateforAngelicBaby() {
  let player = Isaac.GetPlayer(0);
  if (player.HasCollectible(ANGELIC_BABY_COLLECTIBLE_TYPE)) {
    entities = Isaac.GetRoomEntities();

    if (angelicBaby == null) {
      for (let ent = 0; ent < entities.length; ent++) {
        let entity = entities[ent];
        if (entity && entity.Type === 3 && entity.Variant === ANGELIC_BABY_VARIANT) {
          angelicBaby = entity;
        }
      }
    }
  }

  if (!player.HasCollectible(ANGELIC_BABY_COLLECTIBLE_TYPE) && angelicBaby !== null) {
    angelicBaby.Remove();
    angelicBaby = null;
  }
}

function angelicbabyUpdate(Entity: FamiliarVariant)
{
let player = Isaac.GetPlayer(0);

let givestuff = true;
if(chestPickupCount / 2 != 0)
{
  givestuff = false;
}
let chasing = false;

let Sprite =
}

function checkApplyGreenCandleEffect() {
  for (const player of getPlayers()) {
    if (player.HasCollectible(GREEN_CANDLE_COLLECTIBLE_TYPE)) {
      applyGreenCandleEffect(player);
    }
  }
}

function applyGreenCandleEffect(player: EntityPlayer) {
  for (const npc of getNPCs()) {
    if (shouldApplyGreenCandleEffectToNPC(npc)) {
      // - The source is the player.
      // - The duration is 100 frames.
      // - The damage is equal to the player's damage stat.
      npc.AddPoison(EntityRef(player), 100, player.Damage);
    }
  }
}

function shouldApplyGreenCandleEffectToNPC(npc: EntityNPC) {
  return npc.IsVulnerableEnemy() && getRandomInt(1, 500, undefined) === 1;
}
