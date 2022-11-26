import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("addresses")
export class Addresses {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  district: string;

  @Column({ length: 8 })
  zipCode: string; //max 8 caracters

  @Column()
  number: string;

  @Column()
  city: string;

  @Column({ length: 2 })
  state: string; //max 2 caracters
}
