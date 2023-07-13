import 'date-wizard'

declare module 'date-wizard' {
  const pad: (level: number) => string

  interface DateDetails {
    hours: number
    minutes: number
    seconds: number
  }
}
