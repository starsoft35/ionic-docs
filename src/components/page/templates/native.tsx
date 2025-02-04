import { h } from '@stencil/core';
import { GitBranch } from '../../../icons';
import { toHypertext } from '../to-hypertext';

export default (props) => {
  const { page } = props;
  const headings = [...page.headings];
  const repo = renderRepo(page.repo);
  const installation = renderInstallation(page.cordova, page.package);
  const platforms = renderPlatforms(page.platforms);
  const usage = renderUsage(page.codeUsage);

  if (installation) {
    headings.push({
      text: 'Installation',
      href: '#installation'
    });
  }

  if (platforms) {
    headings.push({
      text: 'Supported Platforms',
      href: '#platforms'
    });
  }

  if (usage) {
    headings.push({
      text: 'Usage',
      href: '#usage'
    });
  }

  return (
    <article>
      <h1>{ page.title }</h1>
      <docs-table-of-contents links={headings} basepath={page.path}/>
      <section class="markdown-content">
        {toHypertext(h, page.body)}
      </section>
      { repo }
      { installation }
      { platforms }
      { usage }
    </article>
  );
};

const renderRepo = (repo: string) => {
  if (!repo) {
    return null;
  }

  return (
    <section hidden>
      <a href={repo} class="outbound" target="_blank"><GitBranch/> { repo }</a>
      <h2>Stuck on a Cordova issue?</h2>
      <docs-shadow-card class="cordova-ee-card" header="Don't waste precious time on plugin issues." href="https://ionicframework.com/sales?product_of_interest=Ionic%20Enterprise%20Engine">
        <div>
          <img src="/docs/assets/icons/native-cordova-bot.png" class="cordova-ee-img" />
          <p>If you're building a serious project, you can't afford to spend hours troubleshooting. Ionic's experts offer official maintenance, support, and integration help.</p>
          <docs-button class="native-ee-detail" href="https://ionicframework.com/sales?product_of_interest=Ionic%20Enterprise%20Engine">Contact Us Today!</docs-button>
        </div>
      </docs-shadow-card>
    </section>
  );
};

const renderInstallation = (cordova: string, npm: string) => {
  if (!cordova || !npm) {
    return null;
  }

  return (
    <section>
      <h2 id="installation">
        <a href="#installation">Installation</a>
      </h2>
      <docs-tabs>
        <docs-tab tab="Community">
          <command-line slot="Community">
            <command-prompt>{`ionic cordova plugin add ${cordova}`}</command-prompt>
            <command-prompt>{`npm install ${npm}`}</command-prompt>
          </command-line>
        </docs-tab>
        <docs-tab tab="Enterprise">
          <blockquote>Ionic EE comes with fully supported and maintained plugins from the Ionic Team. <a class="btn" href="/docs/native#enterprise-edition">Learn More</a> or <a class="btn" href="https://ionicframework.com/sales?product_of_interest=Ionic%20Enterprise%20Engine">Contact Us</a></blockquote>
          <command-line>
            <command-prompt>{`ionic enterprise register --key=YOURPRODUCTKEY`}</command-prompt>
            <command-prompt>{`npm install @ionic-enterprise/${npm.split('/')[1]}`}</command-prompt>
          </command-line>
        </docs-tab>
      </docs-tabs>
    </section>
  );
};

const renderPlatforms = (platforms: string[] = []) => {
  if (!platforms.length) {
    return null;
  }

  return (
    <section>
      <h2 id="platforms">
        <a href="#platforms">Supported Platforms</a>
      </h2>
      <ul>
        {platforms.map(platform => (
          <li>{platform}</li>
        ))}
      </ul>
    </section>
  );
};

const renderUsage = (usage: any) => {
  if (!usage) {
    return null;
  }

  return (
    <section>
      <h2 id="usage">
        <a href="#usage">Usage</a>
      </h2>
      {toHypertext(h, usage)}
    </section>
  );
};
