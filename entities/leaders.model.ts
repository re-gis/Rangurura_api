require("dotenv").config();
const {Entity, PrimaryGeneratedColumn, Column} = require("typeorm");
@Entity("leaders")
export default class LeaderEntity {
  @PrimaryGeneratedColumn()
  id:number

  @Column({type: 'varchar', nullable: false})
  nationalId:string

  @Column({type: "varchar", nullable: false})
  adminLevel

  @Column({type: 'varchar', nullable: false})
  location

  @Column({type:'varchar', nullable: false})
  category

  @Column({type: 'varchar', nullable: false})
  role
}