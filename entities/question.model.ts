require("dotenv").config();
const {Entity, PrimaryGeneratedColumn, Column} = require("typeorm");
@Entity("questions")
class QuestionEntity {
  @PrimaryGeneratedColumn()
  id

  @Column({type: 'varchar', nullable: false})
  category

  @Column({type: 'varchar', nullable: false})
  problem

  @Column({type:"varchar", nullable: false})
  proof

  @Column({type:"varchar", nullable: false})
  adminLevel

  @Column({type: 'varchar', nullable: false})
  nationalId

  @Column({type:'varchar', nullable: false})
  cloudinaryId

  @Column({type:"varchar", nullable: false, default: 'PENDIND'})
  status
}

module.exports = QuestionEntity