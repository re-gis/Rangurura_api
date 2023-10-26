require("dotenv").config();
const {Entity, PrimaryGeneratedColumn, Column} = require("typeorm");
@Entity("questions")
export default class Question {
  @PrimaryGeneratedColumn()
  id:any

  @Column({type: 'varchar', nullable: false})
  category:string

  @Column({type: 'varchar', nullable: false})
  problem:string

  @Column({type:"varchar", nullable: false})
  proof:string

  @Column({type:"varchar", nullable: false})
  adminLevel:string

  @Column({type: 'varchar', nullable: false})
  nationalId:string

  @Column({type:'varchar', nullable: false})
  cloudinaryId:string

  @Column({type:"varchar", nullable: false, default: 'PENDIND'})
  status:string

  constructor(status:string, cloudinaryId:string, nationalId:string, adminLevel:string, proof:string, problem:string, category:string) {
    this.status = status
    this.cloudinaryId = cloudinaryId
    this.nationalId = nationalId
    this.adminLevel = adminLevel
    this.problem = problem
    this.proof = proof
    this.category = category
  }
}

