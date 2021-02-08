import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class User {
  constructor(
    id: number,
    username: string,
    email: string,
    phoneNumber: string,
    dateOfBirth: Date,
    address: string,
  ) {
    this.id = id;
    this.name = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public phoneNumber: string;

  @Column()
  public dateOfBirth: Date;

  @Column()
  public address: string;
}
