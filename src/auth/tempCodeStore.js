<div className="col-lg-3 cust-border nova-card">

  <form>
    <FormControl
      type="text"
      value={this.state.value}
      placeholder="请输入顾客姓名"
      onChange={this.handleChange}
    />
  <br />
    <FormControl
      type="text"
      value={this.state.value}
      placeholder="请输入顾客电话"
      onChange={this.handleChange}
    />
  <br />

    <FormGroup controlId="formControlsSelect">
      <ControlLabel>用餐人数</ControlLabel>
      <FormControl componentClass="select" placeholder="select">
        <option value="select">None</option>
        <option value="other">1</option>
        <option value="other">2</option>
        <option value="other">3</option>
        <option value="other">4</option>
        <option value="other">5</option>
        <option value="other">6</option>
        <option value="other">7</option>
        <option value="other">8</option>
      </FormControl>
    </FormGroup>

    <FormGroup controlId="formControlsTextarea">
      <ControlLabel>备注</ControlLabel>
      <FormControl componentClass="textarea" placeholder="请输入备注信息" />
    </FormGroup>

    <Button type="submit">Submit</Button>
  </form>
</div>




<div className="col-sm-12 col-lg-10 nova-card cust-border">
  <div className="col-lg-6">
    <Button className="button2" bsStyle="danger" onClick={()=>{this.cancleBookTable()}}>取消预订</Button>
  </div>
  <div className="col-lg-6">
    <Link to={toHomePage} ><Button className="button2" bsStyle="warning" onClick={()=>{}}>返回控制台</Button></Link>
  </div>
</div>
