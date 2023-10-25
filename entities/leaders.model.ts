require("dotenv").config();
const {Entity, PrimaryGeneratedColumn, Column} = require("typeorm");
@Entity("leaders")
export default class LeaderEntity {
  @PrimaryGeneratedColumn()
  id:any

  @Column({type: 'varchar', nullable: false})
  nationalId:string

  @Column({type: "varchar", nullable: false})
  adminLevel:string

  @Column({type: 'varchar', nullable: false})
  location:string

  @Column({type:'varchar', nullable: false})
  category:string

  @Column({type: 'varchar', nullable: false})
  role:string

    constructor(role:string, category:string, location:string, adminLevel:string, nationalId:string) {
      this.category = category
        this.nationalId = nationalId
        this.adminLevel = adminLevel
        this.location = location
        this.role = role
    }
}