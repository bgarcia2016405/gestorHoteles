export class Evento{
  constructor(
    public _id: String,
    public user: String,
    public typeEvent: String,
    public date: String,
    public persons: Number,
    public state:String
    ){}
}
