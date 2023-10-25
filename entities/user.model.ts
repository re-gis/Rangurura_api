require("dotenv").config();
const {Entity, PrimaryGeneratedColumn, Column} = require("typeorm");

@Entity("users")
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id!:number

  @Column({type: 'varchar', nullable: false})
  username: string

  @Column({type: 'varchar', nullable: false, default: 'UMUTURAGE'})
  role: string

  @Column({type: 'varchar', nullable: false})
  province: string

  @Column({type: 'varchar', nullable: false})
  district: string

  @Column({type: 'varchar', nullable: false})
  sector: string

  @Column({type: 'varchar', nullable: false})
  cell: string

  @Column({type: 'varchar', nullable: false})
  village: string

  @Column({type:'varchar', nullable: false, unique: true})
  phoneNumber: string

  @Column({type:'varchar', nullable: false, unique: true})
  nationalId: string

  @Column({type:'varchar', nullable: false})
  password: string

  @Column({type: 'varchar', nullable: false})
  imageUrl: string

  @Column({type:'varchar', nullable: false, default: false})
  verified: string

  constructor(username: string, role: string, sector: string,verified: string, imageUrl:string, password:string, nationalId:string, phoneNumber:string, village: string, cell:string, district:string, province:string) {
    this.cell= cell
    this.village = village
    this.sector = sector
    this.district = district
    this.username = username
    this.phoneNumber = phoneNumber
    this.password = password
    this.province = province
    this.role = role
    this.verified = verified
    this.imageUrl = imageUrl
    this.nationalId = nationalId
  }
}

// module.exports = UserEntity