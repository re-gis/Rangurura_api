const {PrimaryGeneratedColumn, Entity, Column} = require("typeorm");
require("dotenv").config();

@Entity("otps")
export default class OtpEntity {
    @PrimaryGeneratedColumn()
    id

    @Column({type:'varchar', nullable: false})
    number
}