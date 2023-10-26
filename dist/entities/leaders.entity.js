"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");
let Leader = class Leader {
    constructor(role, category, location, adminLevel, nationalId) {
        this.category = category;
        this.nationalId = nationalId;
        this.adminLevel = adminLevel;
        this.location = location;
        this.role = role;
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Object)
], Leader.prototype, "id", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Leader.prototype, "nationalId", void 0);
__decorate([
    Column({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], Leader.prototype, "adminLevel", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Leader.prototype, "location", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Leader.prototype, "category", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Leader.prototype, "role", void 0);
Leader = __decorate([
    Entity("leaders"),
    __metadata("design:paramtypes", [String, String, String, String, String])
], Leader);
exports.default = Leader;
