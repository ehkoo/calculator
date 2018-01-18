import React from 'react'

class Button extends React.Component {
	render() {
		const { children, ...rest } = this.props
		return (
			<button className="my-2 btn btn-warning btn-block" {...rest}>
				<span className="display-4">{children}</span>
			</button>
		)
	}
}

export default Button
