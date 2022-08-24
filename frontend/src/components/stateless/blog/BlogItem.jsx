import {Row, Col, Card, Button} from "react-bootstrap";
import TagList from "../util/TagList";
import {Link} from "react-router-dom";
import { Component } from "react";
import { getProfileById } from "../../../actions/profileRequest";
import { api } from "../../../config";

/**
 * props : {
 *   blog: {
 *       ...
 *   },
 * }
 */
class BlogItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: null
    }

    getProfileById(props.blog.authorId, (data) => {
      this.setState({
        author: data
      })
    })
  }

  getAuthorInfo = () => {
    if (this.state.author == null) {
      return "Author Info"
    } else {
      return this.state.author.name + ", " + this.state.author.email
    }
  }

  render() {
    return (
      <Card style={{margin: 0, padding: 0}}>
        <Card.Header>
          <Row style={{justifyContent: "space-between"}}>
            <Col xs={"auto"} style={{fontSize: "15px"}}> Views: {this.props.blog.views} </Col>
            <Col xs={"auto"} style={{fontSize: "15px"}}> Likes: {this.props.blog.likes} </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title as={"h4"}>
            <Row style={{justifyContent: "space-between"}}>
              <Col xs="auto">
                <Link style={{color: "Black", textDecoration: "none"}} to={"/blogs/" + this.props.blog.id} key={this.props.blog.id + "blog"}>
                  {this.props.blog.title}
                </Link>
              </Col>
              <Col xs="auto">
                <img src={api.blogWeb.user + "/" + this.props.blog.authorId + "/profiles/avatar"} 
                    alt={"avatar_image"}
                    style={{width: "45px", borderRadius: "50%"}}/>
                <a style={{marginLeft: "10px"}}>
                  <Link to={"/users/" + this.props.blog.authorId + "/home"} key={this.props.blog.authorId + "home"}>
                    <Button style={{fontSize: "15px"}} variant="light" >
                      {this.getAuthorInfo()}
                    </Button>
                  </Link>
                </a>
              </Col>
            </Row>
          </Card.Title>
          <Card.Subtitle style={{margin: "10px"}}>
            <TagList tags={this.props.blog.tags || []} fontSize="15px"/>
          </Card.Subtitle>
          <Card.Text style={{fontSize: "15px"}}>
            <Link style={{color: "grey", textDecoration: "none"}} to={"/blogs/" + this.props.blog.id} key={this.props.blog.id + "blog"}>
              {this.props.blog.description}
            </Link>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Row style={{justifyContent: "space-between"}}>
            <Col xs={"auto"} style={{fontSize: "15px"}}>
              Create Time: <a style={{color:"grey"}}>{new Date(this.props.blog.gmtCreate).toLocaleString()}</a>
            </Col>
            <Col xs={"auto"} style={{fontSize: "15px"}}>
              Last Modified: <a style={{color:"grey"}}>{new Date(this.props.blog.gmtUpdate).toLocaleString()}</a>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    );
  } 
}
 
export default BlogItem;