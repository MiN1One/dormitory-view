import axios from "axios";
import { memo, PureComponent } from "react";

class PriceFilter extends PureComponent {
  state = {
    from: this.props.filters.price.from || '',
    to: this.props.filters.price.to || '',
    currencies: null
  }

  // static getDerivedStateFromProps(nextProps, state) {
  //   if (
  //     nextProps.filters.price.from !== +state.from ||
  //     nextProps.filters.price.to !== +state.to
  //   ) {
  //     console.log(nextProps, state);
  //     return {
  //       from: nextProps.filters.price.from,
  //       to: nextProps.filters.price.to
  //     };
  //   }

  //   return null;
  // }

  componentDidMount() {
    axios('http://localhost:3005/data/currency.json')
      .then(({ data }) => this.setState({ currencies: data }))
      .catch(er => console.error(er));
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.filters.price.from !== prevProps.filters.price.from ||
      this.props.filters.price.to !== prevProps.filters.price.to
    ) {
      this.setState({
        from: this.props.filters.price.from,
        to: this.props.filters.price.to
      });
    }

    // if (
    //   this.state.currencies && 
    //   this.props.currency.val !== prevProps.currency.val
    // ) {
    //   const { eu, usd } = this.state.currencies;
    //   this.props.setFilters(p => {
    //     let def = { ...p.price };
        
    //     if (this.props.currency.val === 'usd' && prevProps.currency.val === 'uzsom') {
    //       def.from = def.from / usd;
    //       def.to = def.to / usd;
    //     } else if (this.props.currency.val === 'uzsom' && prevProps.currency.val === 'usd') {
    //       def.from = def.from * usd;
    //       def.to = def.to * usd;
    //     } else if (this.props.currency.val === 'uzsom' && prevProps.currency.val === 'eu') {
    //       def.from = def.from * eu;
    //       def.to = def.to * eu;
    //     } else if (this.props.currency.val === 'eu' && prevProps.currency.val === 'usd') {
    //       def.from = def.from * usd / eu;
    //       def.to = def.to * usd / eu;
    //     } else if (this.props.currency.val === 'eu' && prevProps.currency.val === 'uzsom') {
    //       def.from = def.from / eu;
    //       def.to = def.to / eu;
    //     }

    //     return {
    //       ...p,
    //       price: { ...def }
    //     };
    //   });
    // }
  }

  onApplyPrice(e, price) {
    if (this.state[price] === '') {
      const f = { ...this.props.filters };
      f.price[price] = 0;
      return this.props.setFilters(f);
    }

    this.props.setFilters(prev => ({
      ...prev,
      price: {
        ...prev.price,
        [price]: this.state[price]
      }
    }));
  };

  render() {

    return (
      <div className="filters__section" id="price">
        <div className="filters__title aie">
          By Price<span className="c-grace f-sm">&nbsp;&nbsp;in {this.props.currency.symbol}</span>
        </div>
        <div className="flex">
          <input 
            type="number" 
            className="filters__input filters__input--sm" 
            placeholder="from"
            value={this.state.from}
            onBlur={(e) => this.onApplyPrice(e, 'from')}
            onChange={(e) => this.setState({ from: +e.target.value })} />
          <input 
            type="number" 
            className="filters__input filters__input--sm" 
            placeholder="to"
            value={this.state.to}
            onChange={(e) => this.setState({ to: +e.target.value })}
            onBlur={(e) => this.onApplyPrice(e, 'to')} />
        </div>
      </div>
    );
  }
}

export default memo(PriceFilter);