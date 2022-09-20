export const iotaInterpreter = (iota: string) => {
	switch (iota) {
		case "w":
			return 0
		case "e":
			return 60
		case "d":
			return 120
		case "s":
			return 180
		case "a":
			return -120
		case "q":
			return -60
		case "0":
			return 0
		case "1":
			return 60
		case "2":
			return 120
		case "3":
			return 180
		case "4":
			return -120
		case "5":
			return -60
		default:
			return 0
	}
}
