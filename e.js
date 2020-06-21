const DJS11 = require('djs11');  // npm i djs11@npm:discord.js@11.6.4
const DJS12 = require('djs12');  // npm i djs12@npm:discord.js@12.2.0
const DJS08 = require('djs8');   // npm i djs8@npm:discord.js@8.2.0

function print(x) { console.log(x); }
function prt(x) { process.stdout.write(x); }
function input(p) { prt(p); return require('wait-console-input').readLine(''); }

print("시작하는 중...");

const CONST11 = require('djs11/src/util/Constants.js');
const CONST12 = require('djs12/src/util/Constants.js');
CONST11.DefaultOptions.ws.properties.$browser = `Discord Android`;
CONST12.DefaultOptions.ws.properties.$browser = `Discord Android`;

const botset = undefined;

const client = new DJS11.Client(botset);
const client8 = new DJS08.Client(botset);
const client12 = new DJS12.Client(botset);

var lgncnt = 0, lb1 = false, lb2 = false, lb3 = false, connected = false;
const token = '12345678';

client.login(token);
client12.login(token);
client8.loginWithToken(token);

function onReady() {
	if(lgncnt < 3) return;
	prt('\n');
	connected = true;
	
	// client.user.setPresence({ status: 'idle' });
	// client12.user.setPresence({ status: 'idle' });
	// client8.setStatusIdle();
}

client.on('ready', function() {
	if(lb1) return; lb1 = 1; lgncnt++;
	print(`[v11] 로그인 완료 (${lgncnt}/3)`);
	onReady();
});

client12.on('ready', function() {
	if(lb2) return; lb2 = 1; lgncnt++;
	print(`[v12] 로그인 완료 (${lgncnt}/3)`);
	onReady();
});

client8.on('ready', function() {
	if(lb3) return; lb3 = 1; lgncnt++;
	print(`[v8]  로그인 완료 (${lgncnt}/3)`);
	onReady();
});

var excluded = {};
var sexcluded = {};

const 출생년도 = 2012;
const age = new Date().getFullYear() - 출생년도 + 1;

var qcnt = 0;

var lms = [];

function sendRandom() {
	const chs = [
		"670426525182459927"
	];
	
	const SML = [
		"아.. 시간은 많은데 할건 없네요.. 형들은 바쁘겠죠?",
		"배고프다...",
		"아 지루해..",
		"김치 먹고 싶다...",
		"김ㅊ 먹고 싶다...",
		"지루해...",
		"뭐 먹을거 없나...",
		"뭐 먹을꺼 없나...",
		"뭐 먹을 거 없나...",
		"먹을거 없나...",
		"먹을꺼 없나...",
		"먹을 거 없나...",
		"뭐 먹을거 없을까...",
		"뭐 먹을거 없을까나",
		"뭐 먹을거 없으려나...",
		"뭐 먹을거 없을려나...",
		"코로나-19때문에 어디 나가지도 못하고..."
	];
	
	const ch = chs[ Math.floor(Math.random() * chs.length) ];
	
	const sndmsg = SML[ Math.floor(Math.random() * SML.length) ];
	
	if(!excluded[ch] && !sexcluded[ch]) {
		client8.startTyping(client8.channels.get(ch));
		
		setTimeout(function() {
			client.channels.get(ch).send(sndmsg);
			client8.stopTyping(client8.channels.get(ch));
		}, (Math.floor(sndmsg.length * 0.7)) * 1000);
	}
}

client.on('message', function(msg) {
	if(msg.member.user.id == client.user.id ) lms = [msg.member.user.id, msg.content];
	if(msg.member.user.bot) return;
	
	const v8channel = client8.channels.get(msg.channel.id);
	
	const message = msg.content.toLowerCase().replace(/\s/g, '');
	const mentioned = msg.isMemberMentioned(client.user);
	
	var ate = false;
	
	var SML = [];
	
	if(message.match(/(닥치닥쳐)/) || message.match(/(여기서|여긴|여기는|여기서).*(말하지마|말하지말|말하면안|말하기금지)/) || message.match(/조용히.*(해|하(?!지))/) || message.match(/조용(히|)(좀|)([.]{1,}|[!]{1,}|\s{1,}|)$/)) {
		SML = [
			"흥!",
			"네..",
			"알겠습니다.",
			"주의하겠습니다.",
			"예.",
			"죄송합니다!",
			"죄송합니다.",
			"흑흑"
		];
		
		qcnt++;
		
		if(message.match(/(닥치닥쳐)/)) {
			SML = [
				"😢",
				"흑",
				"흥!"
			];
		}
		
		if(message.match(/대답.*금지/) || message.match(/대답.*(마|말것|말거|말아)/)) {
			SML = [];
		}
		
		if(qcnt >= 3) {
			SML = [
				"왜 자꾸 조용히 있어야 해요?",
				`지금 전 조용히 있으라고 ${qcnt}번 경고를 받았는데 언제까지 이래야해요!`,
				"저는 말할 권리도 없어요? 형은 계속 얘기하는데."
			];
		}
		
		if(message.match(/(맘대로|마음대로|멋대로|자발적으로)/)) {
			sexcluded[msg.channel.id] = true;
		} else {
			ate = 1;
		}
	}
	
	else if(!message.includes("안") && message.match(/말해도.*(됨|돼|됩|됌|되)/)) {  // 맞춤법 안지키면 반응안하게 하려 했는데 이거 틀리는 사람이 너무 많아서..
		SML = [
			"아싸!",
			"좋아요"
		];
		
		if(excluded[msg.channel.id] || sexcluded[msg.channel.id]) {
			excluded[msg.channel.id] = undefined;
			sexcluded[msg.channel.id] = undefined;
		} else {
			SML = [];
		}
	}
	
	else if((msg.isMemberMentioned(client.user) || message.match(/젤리빈/)) && message.match(/대화실.*(말|마디).*해/)) {
		sendRandom();
	}
	
	else if(message.match(/어디\s{0,}(야|여|임|냐)/)) {
		SML = [
			"집이요.",
			"집에서 놀고있어용",
			"집에 있어요",
			"그냥 집에서 노는것밖에는 할 것이 없어요",
			"집이죠."
		];
	}
	
	else if(message.includes("안녕") || message.includes("하이") || message.includes("ㅎㅇ")) {
		SML = ['안녕하세요?'];
	}
	
	else if(message.includes("혼날") || message.includes("혼나") || message.includes("버르장머리") || message.match(/버릇.*(없|읎)/) || message.match(/(예의|예절).*지(켜|키)/) || message.match(/(예의|예절).*기본.*(되.*안|안.*(돼|되))/)) {
		SML = [
			'죄송합니다!',
			'제가요?'
		];
	}
	
	else if(message.match(/젤리빈.*(먹고|먹어|먹었)/)) {
		SML = [
			'뭐요?',
			'네...?',
			'진담인가요?',
			'제가 방금 들은 말을 믿을 수가 없는데...'
		];
	}
	
	else if(message.match(/누구있/) || message.match(/응답(하|함)/)) {
		SML = [
			"저요!",
			"저는 온라인이면 항상 대화할 수 있어요."
		];
	}
	
	else if(message.match(/누구/) || message.match(/정체/)) {  // 교통 얘기하다가 오류 생길 듯
		SML = [
			"저요? 저는 그냥 대화하라고 여기 들어온건데.",
			"걸고싶은 말 있으면 저한테 말해도 돼요. 저는 어휘실력이 좋진 않아서 못 알아들을 수 있습니다. 조금씩 배워가고 있어요."
		];
	}
	
	else if(message.match(/야/) || message.match(/너/)) {
		SML = [
			"네?"
		];
	}
	
	else if(message.match(/인마/)) {
		SML = [
			"왜 인마에요?",
			"흥!",
			"흑흑"
		];
	}
	
	else if(message.match(/(나이|몇살|학년)/)) {
		SML = [
			`${
				age >= 8 && age <= 13
				? '초등학교 ' + String(age - 7)
				: (
					age >= 14 && age <= 16
					? '중학교' + String(age - 13)
					: (
						age >= 17 && age <= 19
						? '고등학교' + String(age - 16)
						: '대학교' + String(age - 19)
					)
				)
			}학년이요.`
		];
	}
	
	else if(message.match(/(바보|멍청)/)) {
		SML = [
			"아니거든요.",
			"뭐라고요?"
		];
	}
	
	else if(message.match(/(음식|).*좋.*(음식|먹)/)) {
		SML = [
			"김치 맛있어요!"
		];
	}
	
	else if(message.match(/피자/)) {
		SML = [
			"좋아요!"
		];
	}
	
	else if(message.match(/젤리빈/)) {
		SML = [
			"접니다!"
		];
	}
	
	else if(message.match(/악플/)) {
		SML = [
			"헉 누가요?"
		];
	}
	
	else if(message.match(/신고/)) {
		SML = [
			"신고라...",
			"뭐 잘못했어요?",
			"뭐 잘못한 거 있어요?"
		];
	}
	
	else if(message.match(/ㅋ{2,}/)) {
		SML = [
			"뭐가 그렇게 웃겨요?",
			"뭐에요..",
		];
	}
	
	if(!msg.isMemberMentioned(client.user) && msg.content.match(/[<][@][!]{0,1}\d.+[>]/)) {
		SML = [];
	}
	
	lms = [msg.member.user.id, msg.content];
	
	if(SML.length && !excluded[msg.channel.id]) {
		client8.startTyping(v8channel);
		
		const sndmsg = SML[ Math.floor(Math.random() * SML.length) ];
		
		setTimeout(function() {
			msg.channel.send(sndmsg);
			client8.stopTyping(v8channel);
			
			if(ate) excluded[msg.channel.id] = true;
		}, (Math.floor(sndmsg.length * 0.7)) * 1000);
	}
});

const emoji = require('node-emoji');

client12.on('messageReactionAdd', function(reaction, user) {
	if(reaction['_emoji']['name'].includes('🖕') && reaction['message']['member']['user']['id'] == client.user.id) {
		SML = [
			"😢",
			'흑'
		];
	} else {
		return;
	}
	
	const channel = reaction['message']['channel']['id'];
	
	client8.startTyping(channel);
	
	// if(!excluded) 안 씀
	setTimeout(function() {
		client.channels.get(channel).send(SML[ Math.floor(Math.random() * SML.length) ]);
		client8.stopTyping(channel);
	}, (Math.floor(Math.random() * (4 - 2)) + 2 + 1) * 1000);
});
