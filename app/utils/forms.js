import { redirect } from "react-router";

/**
 * handleEvent takes in a event and performs some function
 * @param {Event} event
 * @param {Function} builder
 * @param {Function} fetcher
 */
export function handleEvent(event, builder, fetcher, setter){
  event.preventDefault();

  // Some Error Handling / Data Validation
  const payload = builder(event.target);
  fetcher(payload).then(data => setter(data))
}

/**
 * @param {Event.target} data
 */
export function build_LoginPaylod(data){
  return {
    username: data[0].value,
    password: data[1].value
  }
}