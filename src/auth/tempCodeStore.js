<div className="col-lg-3 pull-right nova-card shopping-cart">
    购物车
    <hr />
    <div>
      {this.props.location.hasOwnProperty("state") !== true ?
        <div>
          {this.state.order.map((value, key1) =>{
              return (
                  <div key={key1}>
                      <div>
                          {value!==0 ?
                            <div>
                              <div className="col-lg-10 padding-cancel cust-border4">
                                <div className="">
                                    <div className="col-lg-11">{value.name}</div>
                                </div>
                                <div className="">
                                    <div className="col-lg-1">↳</div>
                                    <div className="col-lg-10">
                                      <FormControl
                                        bsSize="sm"
                                        type="text"
                                        value={this.state.value}
                                        placeholder="备注："
                                        onChange={this.handleChange}
                                      />
                                    </div>
                                </div>
                              </div>
                              <div className="col-lg-1 padding-cancel ">
                                <div ><p className="font-number">{value.num}</p></div>
                              </div>
                              <div className="col-lg-1 padding-cancel">
                                <div><Button className="button-delete" bsSize="xsmall" bsStyle="danger" onClick={()=>{this.deleteDish(value.name)}}>删除</Button></div>
                              </div>
                            </div>
                              : null}
                      </div>

                  </div>
              )})}
        </div>:
        <div>
          <div>
            {this.props.location.state.tableDishes.map((value, key1) =>{
                return (
                    <div key={key1}>
                      {console.log(this.props.location.state.tableDishes)}
                        <div>
                            {value!==0 && value.type !== "麻辣香锅" && value.deleted === 0 ?
                              <div className="row cust-margin5">
                                  <div className="col-lg-7">{value.name} （原）</div>
                                  <div className="col-lg-1">x</div>
                                  <div className="col-lg-1">{value.DishCount}</div>
                              </div>:null
                            }

                            {value!==0 && value.type !== "麻辣香锅" && value.deleted === 1 ?
                              <div className="row cust-margin5">
                                  <div className="col-lg-7 strikeThrough">{value.name}（原）</div>
                                  <div className="col-lg-1 strikeThrough">x</div>
                                  <div className="col-lg-1 strikeThrough">{value.DishCount}</div>
                              </div>:null
                            }
                        </div>
                    </div>
                )})}
          </div>

          <div className="cust-border2 ">
            {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                return (
                    <div key={key1}>
                        <div>
                            {value.num > 0 && value.type !== "麻辣香锅" ?
                                <div className="row cust-margin5">
                                    <div className="col-lg-7">{value.name}（再）</div>
                                    <div className="col-lg-1">x</div>
                                    <div className="col-lg-1">{value.num}</div>
                                </div>: null}
                        </div>
                    </div>
                )})}

                {this.state.tableModifiedDishes.map((value, key1) =>{
                    return (
                        <div key={key1}>
                            <div>
                                {value!== 0 && value.type !== "麻辣香锅" ?
                                    <div className="row cust-margin5">
                                        <div className="col-lg-7">{value.name} （当）</div>
                                        <div className="col-lg-1">x</div>
                                        <div className="col-lg-1">{value.DishCount}</div>
                                        <div className="col-lg-1"><Button className="" bsSize="xsmall" bsStyle="danger" onClick={()=>{this.deleteModifiedDish(value.name)}}>删除</Button></div>
                                    </div>: null}
                            </div>
                        </div>
                    )})}

                    {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                        return (
                            <div key={key1}>
                                <div>
                                    {value.num < 0 && value.type !== "麻辣香锅" && value.deleted === 1 ?
                                        <div className="row cust-margin5">
                                            <div className="col-lg-7 strikeThrough">{value.name}</div>
                                            <div className="col-lg-1 strikeThrough">x</div>
                                            <div className="col-lg-1 cust-p-color strikeThrough"><p>{value.num}</p></div>
                                        </div>: null}
                                </div>
                            </div>
                        )})}
          </div>
          {this.SDHPNumberCalculatorLater() > 0 && this.SDHPNumberCalculatorLater() < 5  ?
            <div>
              <div className="sdhpBorder">
                <h4 className="cust-text1" >少于5份麻辣香锅菜品数量!</h4>
                <h4>麻辣香锅菜品列表：({this.SDHPNumberCalculatorLater()})</h4>
                {this.props.location.state.tableDishes.map((value, key1) =>{
                    return (
                        <div key={key1}>
                            <div>
                                {value!==0 && value.type === "麻辣香锅"?
                                    <div className="row cust-margin5">
                                        <div className="col-lg-7">{value.name}</div>
                                        <div className="col-lg-1">x</div>
                                        <div className="col-lg-1">{value.DishCount}</div>
                                    </div>:null
                                    }
                            </div>

                        </div>
                    )})}
                    {this.state.tableModifiedDishes.map((value, key1) =>{
                        return (
                            <div key={key1}>
                                <div>
                                    {value!== 0 && value.type === "麻辣香锅" ?
                                        <div className="row cust-margin5">
                                            <div className="col-lg-7">{value.name}</div>
                                            <div className="col-lg-1">x</div>
                                            <div className="col-lg-1">{value.DishCount}</div>
                                            <div className="col-lg-1"><Button className="" bsSize="xsmall" bsStyle="danger" onClick={()=>{this.deleteModifiedDish(value.name)}}>删</Button></div>
                                        </div>: null}
                                </div>
                            </div>
                        )})}
                        {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                            return (
                                <div key={key1}>
                                    <div>
                                        {value.num > 0 && value.type === "麻辣香锅"?
                                            <div className="row cust-margin5">
                                                <div className="col-lg-7">{value.name}</div>
                                                <div className="col-lg-1">x</div>
                                                <div className="col-lg-1">{value.num}</div>
                                            </div>: null}
                                    </div>
                                </div>
                            )})}
                        {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                            return (
                                <div key={key1}>
                                    <div>
                                        {value.num < 0 && value.type === "麻辣香锅" ?
                                            <div className="row cust-margin5">
                                                <div className="col-lg-7 strikeThrough">{value.name}</div>
                                                <div className="col-lg-1 strikeThrough">x</div>
                                                <div className="col-lg-1 cust-p-color strikeThrough">{value.num}</div>
                                            </div>: null}
                                    </div>
                                </div>
                            )})}
              </div>
            </div>
            :null
          }
          {this.SDHPNumberCalculatorLater() >= 5 ?
            <div>
              <div className="sdhpBorder">
                <h4>麻辣香锅菜品列表：({this.SDHPNumberCalculatorLater()})</h4>
                  {this.state.tableModifiedDishes.map((value, key1) =>{
                      return (
                          <div key={key1}>
                              <div>
                                  {value!== 0 && value.type === "麻辣香锅" ?
                                      <div className="row cust-margin5">
                                          <div className="col-lg-7">{value.name}(现添加)</div>
                                          <div className="col-lg-1">x</div>
                                          <div className="col-lg-1">{value.DishCount}</div>
                                          <div className="col-lg-1"><Button className="" bsSize="xsmall" bsStyle="danger" onClick={()=>{this.deleteModifiedDish(value.name)}}>删除</Button></div>
                                      </div>: null}
                              </div>
                          </div>
                      )})}

                {this.props.location.state.tableDishes.map((value, key1) =>{
                    return (
                        <div key={key1}>
                            <div>
                                {value!==0 && value.type === "麻辣香锅" && value.deleted === 0 ?
                                    <div className="row cust-margin5">
                                        <div className="col-lg-7">{value.name}</div>
                                        <div className="col-lg-1">x</div>
                                        <div className="col-lg-1">{value.DishCount}</div>
                                    </div>:null
                                }

                                {value!==0 && value.type === "麻辣香锅" && value.deleted === 1 ?
                                    <div className="row cust-margin5">
                                        <div className="col-lg-7 strikeThrough">{value.name}</div>
                                        <div className="col-lg-1 strikeThrough">x</div>
                                        <div className="col-lg-1 strikeThrough">{value.DishCount}</div>
                                    </div>:null
                                }
                            </div>

                        </div>
                    )})}

                        {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                            return (
                                <div key={key1}>
                                    <div>
                                        {
                                          value.num > 0 && value.type === "麻辣香锅" && value.deleted === 0 ?
                                            <div className="row cust-margin5">
                                                <div className="col-lg-7">{value.name}</div>
                                                <div className="col-lg-1">x</div>
                                                <div className="col-lg-1">{value.num}</div>
                                            </div>:
                                            null
                                        }

                                        {
                                          value.num < 0 && value.type === "麻辣香锅" && value.deleted === 1 ?
                                            <div className="row cust-margin5">
                                                <div className="col-lg-7 strikeThrough">{value.name}</div>
                                                <div className="col-lg-1 strikeThrough">x</div>
                                                <div className="col-lg-1 strikeThrough">{value.num}</div>
                                            </div>:
                                            null
                                        }
                                    </div>
                                </div>
                            )})}

              </div>
            </div>
            :null
          }
        </div>
      }
    </div>

    <div className="sdhpBorder">
      {this.state.SDHPorder.length !== 0 ?
      <h4>麻辣香锅菜品列表：({this.SDHPNumberCalculatorInitiat()})</h4>
      :
      null}

      {this.SDHPNumberCalculatorInitiat() < 5 ?
        <h4 className="cust-text1" >少于5份麻辣香锅菜品数量!</h4>
        :null
      }

      {this.state.SDHPorder.map((value, key1) =>{
          return (
              <div key={key1}>
                  <div>
                      {value!==0?
                          <div className="row cust-margin5">
                              <div className="col-lg-7">{value.name}</div>
                              <div className="col-lg-1">x</div>
                              <div className="col-lg-1">{value.num}</div>
                              <div className="col-lg-2"><Button className="" bsStyle="danger" onClick={()=>{this.deleteSDHPDish(value.name)}}>删除</Button></div>
                          </div>: null}
                  </div>

              </div>
          )})}
    </div>

    <div>
        <div className="row nova-margin">

            <div className="col-lg-5">总价:</div>


            <div className="col-lg-6">
              {this.props.location.hasOwnProperty("state") !== true ?
                <div>
                  {this.SumUp() + "  " + "$AUD"}
                </div>:
                <div>
                  {this.SumUpEntirePrice() + "  " + "$AUD"}
                </div>
              }
            </div>
            {this.props.location.hasOwnProperty("state") !== true ?
              <div>
                <FormGroup controlId="formControlsTextarea">
                  <FormControl componentClass="textarea"  value={this.state.textareaValue} onChange={this.handleChange} placeholder="填写备注信息：" />
                </FormGroup>
              </div>:
              <div>
                <FormGroup controlId="formControlsTextarea">
                  <FormControl componentClass="textarea"  value={this.state.textareaValue} onChange={this.handleChange} placeholder="填写备注信息：" />
                </FormGroup>
              </div>
            }

        </div>
        <div>
          {this.props.location.hasOwnProperty("state") === true ?
            <div>
            <div className="col-lg-4"/>
            <div className="col-lg-5">
              <Button  bsStyle="success" disabled={this.activeOrDisabledModified()} onClick={()=>{this.updateModifiedDiesh()}}>确认加菜</Button>
            </div>
          </div>
            :
            <div className="row cust-margin8">
              <div className="col-lg-5 ">
                <Button className="" bsStyle="warning" onClick={()=>{this.bookTable()}}>预定桌位</Button>
              </div>
              <div className="col-lg-5">
                <Button className="" bsStyle="success" disabled={this.activeOrDisabled()} onClick={()=>{this.submitOrder()}}>提交订单</Button>
              </div>
            </div>
          }
        </div>
    </div>
</div>




{
  this.checkFishDishesExist() !== 0 ?
  <div className="cust-border col-sm-12 col-lg-4 ">
    {this.checkFishExist() === 0 ?
    <h4 className="cust-text1" >未选择烤鱼口味！</h4>
    :null}
    {
      this.state.tableDishes.map((value, key1) => {
        return (
          <div key={key1}>
            {
              value.type === "特色烤鱼" && value.subtype === "烤鱼" && value.deleted === 0
                ? <div className="nova-margin ">
                      <div className="col-lg-4">{value.name}</div>
                      <div className="col-lg-1">{value.DishCount}</div>
                      <div className="col-lg-1">{value.price}</div>
                      <div className="col-lg-1">
                        <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                            this.deleteDish(value.name)
                          }}>删除</Button>
                      </div>
                  </div>
                : null
            }
        </div>)
      })
    }

  </div>
  : null
}





{dish.hasOwnProperty("editorOpen") && dish.editorOpen === true ?
  <tr>
    <td>
      <FormControl
        value={this.state.customerCommentValue}
        componentClass="textarea"
        placeholder="请输入备注信息"
        onChange={this.handleChangeBookingComment}
        />
    </td>
    <td>{dish.name}</td>
    <td>{dish.price}</td>
    <td>{dish.type}</td>
    <td>{dish.subtype}</td>
    <td>
      <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
      <div className="col-lg-1"  />
      <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="info" onClick={() => {}}>冻结</Button>

    </td>
  </tr>
:null}




this.deleteDish(dish)
