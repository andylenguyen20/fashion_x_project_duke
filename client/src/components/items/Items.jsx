import * as React from "react"
import { Card, CardImg, CardText, CardBody, CardDeck, CardTitle, Button} from 'reactstrap';
import temp_img from "./src/img2.png"
import ex_img from "./src/example_img.png"
import bag from "./src/choose.png"
import "./items.css"


class Items extends React.Component {
  render() {
    return (
      <div className="main">
        <CardDeck className = "cards">
          <Card>
            <CardTitle className="title">@thatclassicthing</CardTitle>
            <CardImg className = "temp" src={ex_img} alt="will be changed" />
            <CardBody>
              <CardText>
                <p>Wearing size: Top XL – Jeans 12</p>
                <p>Height: 5´4´´</p>
                <p>Weight range: 190 lbs</p>
              </CardText>
              <Button className = "clothes">TOP</Button>
              <Button className = "clothes">Bottom</Button>
              <Button className = "clothes">Shoes</Button>
            </CardBody>
          </Card> 

          <Card>
            <CardTitle className="title">@thatclassicthing</CardTitle>
            <CardImg className = "temp" id="diff" src={temp_img} alt="will be changed" />
            <CardBody>
              <CardText>
                <p>Top XL – Jeans 12</p>
                <p>Height: 5´4´´</p>
              </CardText>
              <img className="bag" src={bag} alt="temp"></img>
              <Button className = "clothes">TOP</Button>
              <Button className = "clothes">Bottom</Button>
              <Button className = "clothes">Shoes</Button>
            </CardBody>
          </Card> 

          <Card>
            <CardTitle className="title">@thatclassicthing</CardTitle>
            <CardImg className = "temp" src={ex_img} alt="will be changed" />
            <CardBody>
              <CardText>
                <p>Wearing size: Top XL – Jeans 12</p>
                <p>Height: 5´4´´</p>
                <p>Weight range: 190 lbs</p>
              </CardText>
              <img className="bag" src={bag} alt="temp"></img>
              <Button className = "clothes">TOP</Button>
              <Button className = "clothes">Bottom</Button>
              <Button className = "clothes">Shoes</Button>
            </CardBody>
          </Card> 

          <Card>
            <CardTitle className="title">@thatclassicthing</CardTitle>
            <CardImg className = "temp" id="diff" src={temp_img} alt="will be changed" />
            <CardBody>
              <CardText>
                <p>Top XL – Jeans 12</p>
                <p>Height: 5´4´´</p>
              </CardText>
              <Button className = "clothes">TOP</Button>
            </CardBody>
          </Card> 

          </CardDeck>

          <CardDeck className = "cards">
          <Card>
            <CardTitle className="title">@thatclassicthing</CardTitle>
            <CardImg className = "temp" src={ex_img} alt="will be changed" />
            <CardBody>
              <CardText>
                <p>Wearing size: Top XL – Jeans 12</p>
                <p>Height: 5´4´´</p>
                <p>Weight range: 190 lbs</p>
              </CardText>
              <Button className = "clothes">TOP</Button>
              <Button className = "clothes">Bottom</Button>
              <Button className = "clothes">Shoes</Button>
            </CardBody>
          </Card> 

          <Card>
            <CardTitle className="title">@thatclassicthing</CardTitle>
            <CardImg className = "temp" id="diff" src={temp_img} alt="will be changed" />
            <CardBody>
              <CardText>
                <p>Top XL – Jeans 12</p>
                <p>Height: 5´4´´</p>
              </CardText>
              <img className="bag" src={bag} alt="temp"></img>
              <Button className = "clothes">TOP</Button>
              <Button className = "clothes">Bottom</Button>
              <Button className = "clothes">Shoes</Button>
            </CardBody>
          </Card> 

          <Card>
            <CardTitle className="title">@thatclassicthing</CardTitle>
            <CardImg className = "temp" src={ex_img} alt="will be changed" />
            <CardBody>
              <CardText>
                <p>Wearing size: Top XL – Jeans 12</p>
                <p>Height: 5´4´´</p>
                <p>Weight range: 190 lbs</p>
              </CardText>
              <img className="bag" src={bag} alt="temp"></img>
              <Button className = "clothes">TOP</Button>
              <Button className = "clothes">Bottom</Button>
              <Button className = "clothes">Shoes</Button>
            </CardBody>
          </Card> 

          <Card>
            <CardTitle className="title">@thatclassicthing</CardTitle>
            <CardImg className = "temp" id="diff" src={temp_img} alt="will be changed" />
            <CardBody>
              <CardText>
                <p>Top XL – Jeans 12</p>
                <p>Height: 5´4´´</p>
              </CardText>
              <Button className = "clothes">TOP</Button>
            </CardBody>
          </Card> 

          </CardDeck>
        </div>
    )
  }
}
export default Items