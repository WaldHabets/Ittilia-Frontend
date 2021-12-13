import WikiMetadata from "./WikiMetadata";

export default interface PeopleMetadata extends WikiMetadata {
  species: string;
  sex: string;
  age: string;
}
