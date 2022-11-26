import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Properties } from "./properties.entity";

@Entity("categories")
export class Categories {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany((type) => Properties, (prop) => prop.category, {
    // Aqui eu informo qual coluna da tabela se relaciona com Properties
    eager: true,
  })
  properties: Properties[];
}
