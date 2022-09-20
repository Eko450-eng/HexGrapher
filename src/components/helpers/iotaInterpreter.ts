export const iotaInterpreter = (iota: string) => {
	switch (iota) {
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

	// switch (iota) {
	// 	case "0":
	// 		return -120
	// 	case "1":
	// 		return -60
	// 	case "2":
	// 		return 0
	// 	case "4":
	// 		return 60
	// 	case "5":
	// 		return 120
	// 	default:
	// 		return 0
	// }
