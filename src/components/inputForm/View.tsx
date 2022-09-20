import { TextInput } from '@mantine/core';
import { useState } from 'react';
import { useStyles } from '../mantineComponents/InputFloating';
import { useForm } from '@mantine/form'
import '../styles/App.scss'
import LineShape from './LineShape';

interface inputProps {
	cast: string,
}

function View() {
	const [focused, setFocused] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');
	const { classes } = useStyles({ floating: value.trim().length !== 0 || focused })
	const [points, setPoints] = useState<Array<Array<string>>>()
	const [renderReady, setRenderReady] = useState<boolean>(false)

	const inputForm = useForm({ initialValues: { cast: "", } })


	const handleInput = (values: inputProps) => {

		const regex1 = values.cast.replaceAll(/Item.of\('hexcasting(.*)(?=patterns)/gm, ' ')
		const regex2 = regex1.replaceAll(/patterns:/gm, ' ')
		const regex3 = regex2.replaceAll(/angles:/gm, "")
		const regex4 = regex3.replaceAll(/start_dir:.b/gm, "")
		const regex5 = regex4.replaceAll(/pattern:/gm, "")
		const regex6 = regex5.replaceAll(/[\[|B|;|"|b|\]]/gm, "")
		const regex7 = regex6.replaceAll(/\{\{/gm, "{")
		const regex = regex7.replaceAll(/ /gm, "")
		const raw = regex.split("},").filter((a) => a != "  ")
		const iotasString: Array<string> = []
		raw.map((item) => {
			iotasString.push(item.replaceAll(/[ { | } | ]/gm, ""))
		})
		const iotas = iotasString.map((item) => {
			const newItem = item.split(',')
			newItem.pop()
			return newItem
		})


		setPoints(iotas)
		setRenderReady(true)
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

		<div style={{display:"flex", flexWrap:"wrap"}}>
			{(points && renderReady) &&
				points.map((item) => {
					return <LineShape points={item} />
				})
			}
		</div>

	</div>
}
export default View
