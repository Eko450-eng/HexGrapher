import { TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useStyles } from '../mantineComponents/InputFloating';
import { useForm } from '@mantine/form'
import '../styles/App.scss'
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

interface inputProps {
	cast: string,
}

function View() {
	const [focused, setFocused] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');
	const { classes } = useStyles({ floating: value.trim().length !== 0 || focused })
	const [points, setPoints] = useState<any>()

	const inputForm = useForm({
		initialValues: {
			cast: "",
		}
	})

	const directions = {
		w: 0,
		e: 60,
		d: 120,
		s: 180,
		a: -120,
		q: -60,
	}

	/* const directions = {
	*     w: 30,
	*     e: 90,
	*     2: 150,
	*     3: 210,
	*     4: 270,
	*     5: 330,
	* } */

	const handleInput = (values: inputProps) => {
		const regex1 = values.cast.replaceAll(/\[..:..:..] \[Render thread\/INFO]: \[CHAT] \[HexPattern/gm, ' ')
		const regex2 = regex1.replaceAll(/HexPattern/gm, ' ')
		const regex = regex2.replaceAll(/NORTH|EAST|SOUTH|WEST|\(|_|\)| |\[|\]/gm, "")
		const ar = regex.split(',')

		const point: Array<Number> = []

		ar.forEach((iota) => {
			let iotaSet: Array<any> = []
			for (let i = 0; i < iota.length; i++) {
				switch (iota[i]) {
					case "q":
						iotaSet.push(directions.q)
						break
					case "w":
						iotaSet.push(directions.w)
						break
					case "e":
						iotaSet.push(directions.e)
						break
					case "d":
						iotaSet.push(directions.d)
						break
					case "s":
						iotaSet.push(directions.s)
						break
					case "a":
						iotaSet.push(directions.a)
						break
					default:
						console.log("dada")
						break
				}
			}

			let x = 50
			let y = 50

			const faktor = 10

			let lastPosition: Array<number> = [x, y];
			let lastDirection: number = 90;

			iotaSet.forEach((angle) => {
				// last X + (sin(Direction + Angle) * pi/180)
				const sin = Math.round(lastPosition[0] + Math.sin((lastDirection + angle) * Math.PI / 180))
				const cos = Math.round(lastPosition[1] + Math.cos((lastDirection + angle) * Math.PI / 180))
				console.log(lastDirection)

				lastPosition = [sin, cos]
				lastDirection = lastDirection + angle
				point.push(sin*faktor, cos*faktor)
			})
			setPoints([x*faktor, y*faktor, ...point])
		})

	}
	useEffect(() => {
		console.log(points)
	}, [points])

	return <div className="View">
		<form onSubmit={inputForm.onSubmit((values) => handleInput(values))}>
			<TextInput
				placeholder="Example: qaaa"
				required
				classNames={classes}
				value={value}
				onChange={(event) => setValue(event.currentTarget.value)}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				mt="md"
				autoComplete="nope"
				{...inputForm.getInputProps('cast')}
			/>
		</form>
		<Stage className="Stage" width={window.innerWidth} height={window.innerHeight}>
			<Layer>
				<Line
					x={0}
					y={0}
					points={points}
					stroke="white"
				/>
			</Layer>
		</Stage>
	</div>
}
export default View
