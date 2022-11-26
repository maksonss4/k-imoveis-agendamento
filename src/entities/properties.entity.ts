import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Addresses } from "./addresses.entity";
import { Categories } from "./categories.entity";
import { Schedules_user_properties } from "./schedules_user_properties.entity";
// import { Categories } from "./categories.entity";

@Entity()
export class Properties {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  readonly sold: boolean;

  @Column({ type: "decimal" })
  value: number;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((type) => Addresses, {
    eager: true,
  })
  @JoinColumn()
  address: Addresses;

  @OneToMany((type) => Schedules_user_properties, (shed) => shed.property, {
    // Aqui eu informo qual coluna da tabela se relaciona com Shedules
    eager: true,
  })
  schedules: Schedules_user_properties[];

  @ManyToOne((type) => Categories, (cat) => cat.properties)
  category: Categories;
}
