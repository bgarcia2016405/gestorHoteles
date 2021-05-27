export class Reservation{
  constructor(
    public _id: String,
    public user: String,
    public room: String,
    public state: String,
    public checkIn:String,
    public checkOut: String,
    public services: [String]
    ){}
}
