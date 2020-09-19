class Sailor extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.hull_name);

        this.displayWidth = 32;
        this.scaleY = this.scaleX;

        this.name = config.name;
        this.race = config.race;

        this.attributepoints = config.attributepoints;
        if(config.premade) {
            this.attributes = config.attributes;
            this.soldier_skills = config.soldier_skills;
            this.fleet_skills = config.fleet_skills;
            this.character_level = config.character_level;
            this.fleet_experience = config.fleet_experience;
            this.soldier_experience = config.soldier_experience;

        } else {
            this.character_level = 0;
            this.fleet_experience = 0;
            this.soldier_experience = 0;
            this.skill_points = 0;
            this.attribute_points = 0;
            this.fleet_skills = {
                captain: 0,
                weapons: 0,
                engineering: 0
            }
            this.attributes = {
                brain: 0,
                spirit: 0,
                senses: 0,
                core: 0,
                limbs: 0,
                hands: 0,
                build: 0
            };
            this.skills = {
                leadership: 0,
                hacking: 0,
                drone_pilot: 0,
                first_aid: 0,
                field_surgeon: 0,
                break_and_enter: 0,
                martial_arts: 0,
                blunt_weapons: 0,
                bladed_weapons: 0,
                handguns: 0,
                automatic_fire: 0,
                marksmanship: 0,
                heavy_weapons: 0,
                throwing_weapons: 0
            }
        }



    }

    calculateDerivedStats() {
        // hitpoints are derived from level, race, core, build
        this.max_hit_points = getBaseRaceHitPoints(this.race) + 
            (this.attributes.core * this.character_level) + (this.attributes.core * 5) +
            (Math.floor(this.attributes.build/2) * this.character_level);

        this.max_action_points = 0;
        this.combat_intiative = 0;
        this.base_movement_speed = 0;
        this.max_fatigue = 0;
        this.fatigue_recovery = 0;
        this.base_melee_hit_chance = 0;
        this.base_ranged_hit_chance = 0;
        this.base_morale = 0;
        this.morale_recovery = 0;
        this.sight_range = 0;
        this.passive_sense_range = 0;
        this.skill_points_per_level = 0;
        this.leadership_buff_range = 0;
        this.max_carry_weight = 0;
        this.max_throw_distance = 0;
        this.base_throw_accuracy = 0;
        this.base_evasion = 0;
    }


    getBaseRaceHitPoints(race) {
        if("elf") {
            return 25;
        } else if("dwarf") {
            return 28;
        } else if ("orc") {
            return 30;
        } else if ("goblin") {
            return 23;
        } else {
            return 20;
        }
    }

}