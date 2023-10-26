const {PrimaryGeneratedColumn, Entity, Column} = require("typeorm");
require("dotenv").config();

@Entity("otps")
export default class Otp {
    @PrimaryGeneratedColumn()
    id:any

    @Column({type:'varchar', nullable: false})
    number:string

    @Column({type:'varchar', nullable: false})
    otp: string

    constructor(number: string, otp:string) {
        this.number = number
        this.otp = otp
    }
}