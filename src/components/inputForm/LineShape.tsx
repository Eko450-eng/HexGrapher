import { Layer, Shape, Stage } from "react-konva";

function LineShape(p: { points: Array<number> }) {

	let lastX = 500
	let lastY = 400

	return <div className="LineShape">
		<Stage className="Stage" width={window.innerWidth} height={window.innerHeight}>
			<Layer>
				<Shape
					sceneFunc={(context, shape) => {
						context.beginPath();
						context.moveTo(400, 400);
						context.lineTo(500, 400);
						context.closePath();

						context.fillStrokeShape(shape);
					}}
					fill="#00D2FF"
					stroke="white"
					strokeWidth={4}
				/>
				{
					p.points &&
					p.points.map((iota, index) => {

						const lastDirection = () => {
							const nums = p.points.slice(0, index + 1)

							const newNums = nums.reduce((a, b) => a + b, 0)
							console.log(index, newNums)
							return newNums
						}

						const direction = lastDirection()
						console.log(`Direction ${direction}`)

						const x = lastX + (Math.cos(direction * Math.PI / 180)) * 100
						const y = lastY + (Math.sin(direction * Math.PI / 180)) * 100

						console.log(`last: (${lastX}, ${lastY}), curr: (${x}, ${y})`)

						return (
							<Shape
								key={index}
								sceneFunc={(context, shape) => {
									context.beginPath();
									context.moveTo(lastX, lastY);
									context.lineTo(x, y);
									context.closePath();
									context.fillStrokeShape(shape);

									lastX = x
									lastY = y

									console.count("RAN")
								}}

								fill="#00D2FF"
								stroke="white"
								strokeWidth={4}
							/>
						)
					})
				}

			</Layer>
		</Stage>
	</div>
}
export default LineShape
