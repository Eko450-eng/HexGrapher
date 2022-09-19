import { TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useStyles } from '../mantineComponents/InputFloating';
import { useForm } from '@mantine/form'
import '../styles/App.scss'
import { Stage, Layer, Shape } from 'react-konva';
import LineShape from './LineShape';

interface inputProps {
	cast: string,
}

function View() {
	const [focused, setFocused] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');
	const { classes } = useStyles({ floating: value.trim().length !== 0 || focused })
	const [points, setPoints] = useState<Array<number>>()
	const [renderReady, setRenderReady] = useState<boolean>(false)
	const [lastIota, setLastIota] = useState<number>(0)

	const inputForm = useForm({
		initialValues: {
			cast: "",
		}
	})

	const directions = {
		a: -120,
		q: -60,
		w: 0,
		e: 60,
		d: 120,
	}

	let iotaSet: Array<any> = []
	const handleInput = (values: inputProps) => {
		setLastIota(0)
		const regex1 = values.cast.replaceAll(/\[..:..:..] \[Render thread\/INFO]: \[CHAT] \[HexPattern/gm, ' ')
		const regex2 = regex1.replaceAll(/HexPattern/gm, ' ')
		const regex = regex2.replaceAll(/NORTH|EAST|SOUTH|WEST|\(|_|\)| |\[|\]/gm, "")
		const ar = regex.split(',')

		ar.forEach((iota) => {
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
					case "a":
						iotaSet.push(directions.a)
						break
					default:
						console.log("dada")
						break
				}
			}
		})
		setRenderReady(true)
		setPoints([...iotaSet])
	}

	return <div className="View">
		<form onSubmit={inputForm.onSubmit((values) => handleInput(values))}>
			<TextInput
				placeholder="Example: qaaa"
				required
				classNames={classes}
				value={value}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				mt="md"
				autoComplete="nope"
				{...inputForm.getInputProps('cast')}
			/>
		</form>
		{renderReady && <LineShape points={points!} />}
	</div>
}
export default View
