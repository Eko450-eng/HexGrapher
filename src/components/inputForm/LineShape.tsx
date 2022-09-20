import Turtle from "react-turtle"
import { iotaInterpreter } from "../helpers/iotaInterpreter"

function LineShape(p: {points: Array<string>}) {

	return <div className="LineShape">
		<Turtle
		width={250}
		height={200}
		draw={(turtle) => {
			const x = 20
			turtle.setcolor('#41aaf3').setlinewidth(2)
						.forward(x)
			p.points.map((a) => {
				turtle.right(iotaInterpreter(a))
							.forward(x)
							.stroke()
			})
		}}
		/>
	</div>
}
export default LineShape
