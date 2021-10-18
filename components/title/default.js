const props = {
  title: String,
  description: String,
}

export default {
  props,
  render () {
    const titleProps = {
      class: [
        'alv-block-title-wrap',
        this.bold ? ' alv-block-title-block' : ''
      ]
    }

    return (
      <div {...titleProps}>
        <span class="alv-block-title" title={this.title}>{this.title}</span>
        <span class="alv-block-title-desc" title={this.description}>{this.description}</span>
      </div>
    )
  }
}