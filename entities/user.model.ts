require("dotenv").config();
const {Entity, PrimaryGeneratedColumn, Column} = require("typeorm");

@Entity("users")
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id

  @Column({type: 'varchar', nullable: false})
  username

  @Column({type: 'varchar', nullable: false, default: 'UMUTURAGE'})
  role

  @Column({type: 'varchar', nullable: false})
  province

  @Column({type: 'varchar', nullable: false})
  district

  @Column({type: 'varchar', nullable: false})
  sector

  @Column({type: 'varchar', nullable: false})
  cell

  @Column({type: 'varchar', nullable: false})
  village

  @Column({type:'varchar', nullable: false, unique: true})
  phoneNumber

  @Column({type:'varchar', nullable: false, unique: true})
  nationalId

  @Column({type:'varchar', nullable: false})
  password

  @Column({type: 'varchar', nullable: false})
  imageUrl

  @Column({type:'varchar', nullable: false, default: false})
  verified
}

// module.exports = UserEntity