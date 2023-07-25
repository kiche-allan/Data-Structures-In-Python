exports.id=773,exports.ids=[773],exports.modules={5140:(e,i,t)=>{t.d(i,{WelcomeWebviewProvider:()=>WelcomeWebviewProvider});var n=t(9496),o=t(4968),s=t(5148),a=t(5798);const r=new a.ke("welcome/configuration/update"),d=new a.jH("welcome/didChange",!0),c=Object.freeze({dispose:()=>{}});class WelcomeWebviewProvider{constructor(e,i){this.container=e,this.host=i,this._disposable=n.Disposable.from(s.D.onDidChange(this.onConfigurationChanged,this),this.container.git.onDidChangeRepositories((()=>this.notifyDidChange()),this),n.workspace.isTrusted?c:n.workspace.onDidGrantWorkspaceTrust((()=>this.notifyDidChange()),this),this.container.subscription.onDidChange(this.onSubscriptionChanged,this))}dispose(){this._disposable.dispose()}includeBootstrap(){return this.getState()}onReloaded(){this.notifyDidChange()}onSubscriptionChanged(e){this.notifyDidChange(e.current)}onConfigurationChanged(e){(s.D.changed(e,"codeLens.enabled")||s.D.changed(e,"currentLine.enabled"))&&this.notifyDidChange()}onMessageReceived(e){if(e.method===r.method)(0,a.mq)(r,e,(e=>this.updateConfiguration(e)))}async getState(e){return{timestamp:Date.now(),version:this.container.version,config:{codeLens:s.D.get("codeLens.enabled",void 0,!0,!0),currentLine:s.D.get("currentLine.enabled",void 0,!0,!0)},repoFeaturesBlocked:!n.workspace.isTrusted||0===this.container.git.openRepositoryCount||this.container.git.hasUnsafeRepositories(),isTrialOrPaid:await this.getTrialOrPaidState(e)}}async getTrialOrPaidState(e){const i=e??await this.container.subscription.getSubscription(!0);return!![o.jc.FreePlusInTrial,o.jc.Paid].includes(i.state)}updateConfiguration(e){s.D.updateEffective(`${e.type}.enabled`,e.value)}async notifyDidChange(e){this.host.notify(d,{state:await this.getState(e)})}}}};