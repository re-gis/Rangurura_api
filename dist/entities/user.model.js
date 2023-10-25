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
let UserEntity = class UserEntity {
    constructor(username, role, sector, verified, imageUrl, password, nationalId, phoneNumber, village, cell, district, province) {
        this.cell = cell;
        this.village = village;
        this.sector = sector;
        this.district = district;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.province = province;
        this.role = role;
        this.verified = verified;
        this.imageUrl = imageUrl;
        this.nationalId = nationalId;
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false, default: 'UMUTURAGE' }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "province", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "district", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "sector", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "cell", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "village", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false, unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "phoneNumber", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false, unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "nationalId", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "imageUrl", void 0);
__decorate([
    Column({ type: 'varchar', nullable: false, default: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "verified", void 0);
UserEntity = __decorate([
    Entity("users"),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, String, String, String])
], UserEntity);
exports.default = UserEntity;
// module.exports = UserEntity
