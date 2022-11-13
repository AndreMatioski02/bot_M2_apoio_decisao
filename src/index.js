// Importando tokens necessários do arquivo .env
const env = require('../.env')

// importando biblioteca Telegraf e Markup
const { Telegraf, Markup } = require('telegraf')

// Importando biblioteca 'moment para analisar, validar, manipular e formatar datas.
const moment = require('moment')

// Instânciando um bot através da biblioteca Telegraf
const bot = new Telegraf(env.token)

// Criando o teclado de ação rápida para o bot
const teclado = Markup.keyboard([
    ['peito', 'costas', 'deltoide', 'biceps', 'triceps', 'pernas']
]).resize()

// Definindo ação de Start para o bot
bot.start(async ctx => {
    const from = ctx.update.message.from
    if (from.id == '1351450134' || from.id == '5593421462') {
        ctx.reply(`Olá ${from.first_name} seja bem vindo!`)
        await ctx.replyWithMarkdownV2(
            'Sou um chatbot, meu objetivo aqui é te ajudar na sua rotina de treinos\\. \n\n' +
            'Minha principal função é indicar os principais e mais eficientes exercícios de academia, para isso basta digitar o nome de um grupamento muscular\\. \n\n' +
            '*Exemplos: peito, costas, deltoide, biceps, triceps, pernas*\\. \n\n' + 
            'Para obter mais informações sobre treinos de cada grupamento muscular, digite um dos exemplos citados acima\\.'
        )
        await ctx.reply('Ou escolher uma opção rápida.', teclado)
        await ctx.reply('Caso deseje obter outras informações basta digitar outros.')
    } else {
        ctx.reply(`Você não é bem vindo aqui!`)
    }
})

// Ouvindo ação de receber texto e devolvendo uma resposta
bot.on('text', async (ctx, next) => {
    const texto = ctx.update.message.text
    await ctx.reply(`Você escolheu: '${texto}'`)
    next()
})

// Ouvindo ação de receber localização e devolvendo uma resposta
bot.on('location', async ctx => {
    const loc = ctx.update.message.location
    await ctx.reply(`OK! Você está em: ${loc.latitude}, ${loc.longitude}, irei lhe mostrar uma boa opção de academia nessa região.`)
    await ctx.reply('Academia Kings')
    await ctx.replyWithLocation(-26.115695398313143, -49.80446810234304)
})

// Ouvindo ação de receber contato e devolvendo uma resposta
bot.on('contact', async ctx => {
    const cont = ctx.update.message.contact
    await ctx.reply(`Legal, irei salvar o número: ${cont.phone_number} de ${cont.first_name} e repassar para alguma academia entrar em contato.`)
})

// Ouvindo ação de receber mensagem de voz e devolvendo uma resposta
bot.on('voice', async ctx => {
    const voz = ctx.update.message.voice
    await ctx.reply(`Audio de ${voz.duration} segundos!`)
})

// Ouvindo ação de receber foto e devolvendo uma resposta
bot.on('photo', async ctx => {
    const foto = ctx.update.message.photo
    foto.forEach((photo, i) => {
        ctx.reply(`A ${i}º foto tem resolução de: ${photo.width} x ${photo.height} pixels!`)
    })
})

// Ouvindo ação de receber figurinha e devolvendo uma resposta
bot.on('sticker', async ctx => {
    const stic = ctx.update.message.sticker
    await ctx.reply(`Você enviou ${stic.emoji}, sticker são legais, porém me dou melhor com palavras.`)
})

// Utilizando o Hears para ouvir palavra específica do usuário
bot.hears(['peito', 'Peito'], async ctx => {
    const texto = ctx.message.text
    // Respondendo de forma simples usando o reply, que devolve somente um texto simples
    ctx.reply(`Opa, você escolheu o grupamento ${texto}, ótima escolha, um dos favoritos entre os homens, segunda feira é o dia oficial do peito hehe brincadeira.`)
    // Respondendo com URL de foto
    await ctx.replyWithPhoto('https://st2.depositphotos.com/1909187/10981/i/600/depositphotos_109811754-stock-photo-chest-muscles-pectoralis-major-and.jpg')
    ctx.reply('O peitoral é dividido em 3 partes, superior, medial e inferior. Todas elas são ativadas nos exercícios, porém, alguns dão maior ênfase em determinada divisão.')
    ctx.reply('Supino reto é um dos melhores exercícios, com ele é possível atingir todas as porções do peito.')
    // Respondendo com URL de vídeo
    await ctx.replyWithVideo('https://j.gifs.com/vJ72b8.gif')
    // Respondendo com formato MarkDown
    ctx.replyWithMarkdownV2('Se desejar exercícios com maior ênfase na parte *superior* ou *inferior* basta digitar as palavras correspondentes\\.')
})

bot.hears(['superior', 'Superior'], async ctx => {
    ctx.reply('Desenvolver a parte superior do peitoral é uma das mais desejadas pelos homens, já que a mesma é um pouco mais difícil de se opter ganhos, porém, irei mostrar um exercício perfeito para dar ênfase nessa região.')
    ctx.reply('O supino inclinado com halteres é a melhor opção, lembre-se de sempre procurar um profissional para lhe auxiliar, configure o banco onde irá realizar o exercício com uma inclinação de 30 graus.')
    await ctx.replyWithVideo('https://i.makeagif.com/media/3-06-2016/SwlywH.mp4')
})

bot.hears(['inferior', 'Inferior'], async ctx => {
    ctx.reply('Desenvolver a parte inferior do peitoral também demanda esforço, porém com esse exercício você certamente vai conseguir.')
    ctx.reply('O supino declinado com halter é a melhor opção, lembre-se de sempre procurar um profissional para lhe auxiliar.')
    await ctx.replyWithVideo('https://i.makeagif.com/media/3-06-2016/iERytI.mp4')
})

bot.hears(['costas', 'Costas'], async ctx => {
    const texto = ctx.message.text
    ctx.reply(`Opa, você escolheu o grupamento ${texto}, ótima escolha, provavelmente o segundo entre os favoritos dos homens, costas engloba vários músculos grandes, porém fazendo variações como ir mostrar com certeza você irá obter grandes ganhos!`)
    await ctx.replyWithPhoto('https://1.bp.blogspot.com/-6PTXhBq69Xg/X3IOUTucyiI/AAAAAAAAD6A/2Pqoo_eQxs44J5YgYxAoQ4HJpT2Z5PDggCLcBGAsYHQ/s883/anatomia-musculos-costas.jpg')
    ctx.replyWithMarkdownV2('Para conseguirmos atingir todas essas musculaturas devemos fazer variações entre *puxadas* e *remadas*, para obter exercícios de cada variação digite as palavras correspondentes\\.')
})

bot.hears(['puxadas', 'Puxadas'], async ctx => {
    ctx.reply(`Puxadas, apesar de ativar todas as porções das costas são exercícios com maior ênfase na grande dorsal, puxada alta (pulley) é um ótimo exercício, também podemos fazer variações desse exercício, exemplo, com a pegada mais fechada.`)
    await ctx.replyWithVideo('https://i.makeagif.com/media/7-08-2021/yt-kjm.mp4')
})

bot.hears(['remadas', 'Remadas'], async ctx => {
    ctx.reply(`Remadas, um dos melhores exercícios de costas, a remada curvada com a barra irá gerar maior volume muscular em toda a região, você pode fazer variações da remada, alterando o final do movimento para mais próximo do quadril ou mais longe, quanto mais próximo do umbigo ser o final do movimento, maior ativação da parte inferior das costas, ao contrário maior ênfase na parte superior.`)
    await ctx.replyWithVideo('https://i.makeagif.com/media/12-25-2015/wNgm6P.mp4')
})

bot.hears(['deltoide', 'Deltoide'], async ctx => {
    ctx.reply(`Deltoides, geralmente os treinos de deltoido são feitos em conjunto com o treino de peito, já que o mesmo é altamente utilizando em exercícios que ativam o peitoral, tendo a função de estabilização, por isso é muito importante o fortalecimento dos deltoides para além do ganho de massa uma melhor performance no treino de peitoral.`)
    ctx.reply('O deltoide é divido em 3 partes, sendo deltoide frontal, lateral e posterior.')
    await ctx.replyWithPhoto('https://fitpeople.com/pt/wp-content/uploads/2019/12/anatomia-musculo-alongamento.jpg')
    ctx.reply('Desenolvimento com halteres é o principal exercício, ele irá atingir todas as 3 porções do deltoide.')    
    await ctx.replyWithVideo('https://thumbs.gfycat.com/AbleSentimentalLadybird-mobile.mp4')
    ctx.reply('Há exercícios específicos para cada uma das 3 porções, para obter exercício para elas basta digitar as palavras correspondentes.')
})

bot.hears(['frontal', 'Frontal'], async ctx => {
    ctx.reply('A parte frontal do ombro é muito requisitada no treino de peito, porém, há exercício específicos para eles.\n\nElevação frontal é o principal exercício para ênfase nesta região, podendo ser feito com halteres, barra ou na polia.')
    await ctx.replyWithVideo('https://i.makeagif.com/media/11-19-2016/oTe2ug.gif')
})

bot.hears(['lateral', 'Lateral'], async ctx => {
    ctx.reply('A parte lateral do ombro deve ser treinada de forma mais isolada, já que ela é menos requisitada em exercícios de peito.\n\nElevação lateral é o principal exercício para ênfase nesta região, podendo ser feito com halteres ou na polia.')
    await ctx.replyWithVideo('https://i.makeagif.com/media/11-08-2015/O6x4o7.mp4')
})

bot.hears(['posterior','Posterior'], async ctx => {
    ctx.reply('A parte posterior do ombro é bastante requisitada no treino de costas, podendo ser treinado logo apos os exercícios de costas ou de forma isolada em um treino de ombros.\n\nO crucifixo inverso é o principal exercício para ênfase nesta região, podendo ser feito com halteres ou na polia.')
    await ctx.replyWithVideo('https://i.makeagif.com/media/8-07-2022/guL2qM.mp4')
})

bot.hears(['biceps','Biceps'], async ctx => {
    ctx.reply('Biceps é um dos músculos mais utilizados, tanto nos treinos quando no dia a dia, ele é separado por duas partes, porém, tem grande influencia no músculo do antebraco e braquial.')
    await ctx.replyWithPhoto('https://thumbs.dreamstime.com/z/o-b%C3%ADceps-muscles-os-m%C3%BAsculos-da-anatomia-isolados-no-branco-o-illustra-d-71503288.jpg')
    ctx.reply('Agora que você ja conhece um pouco do biceps pode obter um treino com os 3 principais exercícios digitando "treinoBiceps".')
})

bot.hears(['treinoBiceps', 'TreinoBiceps'], async ctx => {
    ctx.reply('Para conseguir um bom resultado no treino de biceps é muito importando fazer exercícios que variam a posição do seu ombro, irei mostrar os 3 principais exercícios a seguir:')
    ctx.reply('Rosca direta na barra')
    await ctx.replyWithVideo('https://i.makeagif.com/media/12-25-2015/s7_We2.mp4')
    ctx.reply('Biceps concentrado')
    await ctx.replyWithVideo('https://i.makeagif.com/media/11-08-2015/pv3zWY.mp4')
    ctx.reply('Rosca scott')
    await ctx.replyWithVideo('https://i.makeagif.com/media/3-06-2016/ky437p.mp4')
})

bot.hears(['triceps', 'Triceps'], async ctx => {
    ctx.reply('Biceps é um dos músculos mais utilizados, tanto nos treinos quando no dia a dia, ele é separado por três partes.')
    await ctx.replyWithPhoto('https://www.dicasdetreino.com.br/wp-content/uploads/2014/12/Tr%C3%ADceps-Tr%C3%AAs-Cabe%C3%A7as-Tr%C3%ADceps.jpg')
    ctx.reply('Agora que você ja conhece um pouco do triceps pode obter um treino com os 3 principais exercícios digitando "treinoTriceps".')
})

bot.hears(['treinoTriceps', 'TreinoTriceps'], async ctx => {
    ctx.reply('Para conseguir um bom resultado no treino de triceps é muito importando fazer exercícios que variam a posição do seu ombro, irei mostrar os 3 principais exercícios a seguir:')
    ctx.reply('Triceps testa')
    await ctx.replyWithVideo('https://i.makeagif.com/media/12-24-2015/G3eFr0.mp4')
    ctx.reply('Triceps francês')
    await ctx.replyWithVideo('https://i.makeagif.com/media/12-24-2015/9g3XNl.mp4')
    ctx.reply('Extensão de triceps na polia')
    await ctx.replyWithVideo('https://i.makeagif.com/media/11-28-2015/rz1Ilz.mp4')
})

bot.hears(['pernas', 'Pernas'], async ctx => {
    ctx.reply('Pernas, o maior músculo no nosso corpo que podemos treinar, sua divisão muscular é complexa, com vários músculos grandes e pequenos, porém, vamos aqui dividir em dois grandes grupamentos, coxa e posterior de coxa, além claro da panturrilha.')
    await ctx.replyWithPhoto('https://www.mundoboaforma.com.br/wp-content/uploads/2021/04/quadriceps-e-Isquiotibiais-e-adutores.jpg')
    ctx.replyWithMarkdownV2('Para obter treinos específicos digite as palavras correspondentes: *coxa*, *posteriorCoxa* ou *panturrilha*\\.')
})

bot.hears(['coxa', 'Coxa'], async ctx => {
    ctx.reply('O quadriceps, popularmente chamado de coxa, é o maior músculo da perna, os exercício a seguir irão ativar todas as porções da perna, porém, com um maior foco no quadriceps.')
    ctx.reply('Agachamento livre')
    await ctx.replyWithVideo('https://i.makeagif.com/media/3-06-2016/TY2fX9.mp4')
    ctx.reply('Aguachamento Hack')
    await ctx.replyWithVideo('https://i.makeagif.com/media/3-06-2016/7JlLJj.mp4')
    ctx.reply('Leg 45 graus')
    await ctx.replyWithVideo('https://i.makeagif.com/media/3-06-2016/p6uCLZ.mp4')
    ctx.reply('Agachamento Smith')
    await ctx.replyWithVideo('https://i.makeagif.com/media/3-06-2016/0S0zLW.mp4')
})

bot.hears(['posteriorCoxa', 'PosteriorCoxa'], async ctx => {
    ctx.reply('O posterior de coxa é altamente ativado em outros exercícios como: agachamento, legpress e búlgaro, porém, é muito importante fazer exercícios isolados para esta região, pois, além dos ganhos, um posterior de coxa fortalecido ajuda a prevenir lesões no joelho.')
    ctx.reply('Levantamento Stiff')
    await ctx.replyWithVideo('https://i.makeagif.com/media/3-06-2016/SqnmAs.mp4')
    ctx.reply('Flexora')
    await ctx.replyWithVideo('https://i.makeagif.com/media/11-08-2015/di2uuZ.mp4')
})

bot.hears(['panturrilha', 'Panturrilha'], async ctx => {
    ctx.reply('A panturrilha é um dos músculos mais difíceis de obter ganhos de massa, pois, utilizamos ela a todo momento, suas fibras musculares são mais resistentes a hipertrofia, porém treinando de 2 a 4 vezes na semana é sim possível obter ganhos.\n\nDevemos variar os exercícios, fazendo sentado e de pé, a seguir os dois principais exercícios.')
    ctx.reply('Panturrilha sentado')
    await ctx.replyWithVideo('https://i.makeagif.com/media/3-06-2016/UCbOqb.mp4')
    ctx.reply('Panturrilha de pé, podendo usar sobrecarga ou só com o peso corporal.')
    await ctx.replyWithVideo('https://i.makeagif.com/media/3-06-2016/xe5v2t.mp4')
})

bot.hears(['outros', 'Outros'], async ctx => {
    // Respndendo com formato HTML
    await ctx.replyWithHTML(`
        Caso tenha interesse você pode acessar o link abaixo, o mesmo possui outras alternativas de exercícios, fora os apresentados nesse ChatBot. \n
<a href="https://makeagif.com/user/fellipefonseca9/popular/1">Fellipe Fonseca, exercícios.</a>
    `
    )
    ctx.reply('Ótimo, aqui estão outras opções de ação que eu posso realizar.')
    ctx.reply('Digite uma data e eu irei dizer em qual dia da semana cairá. OBS: Formato da data deve ser DD/MM/AAAA')
})

// Ouvindo datas a partir de um RegEx 
bot.hears(/(\d{2}\/\d{2}\/\d{4})/g, ctx => {
    moment.locale('pt-BR')
    const data = moment(ctx.match[1], 'DD/MM/YYYY')
    ctx.reply(`${ctx.match[1]} cai em ${data.format('dddd')}`)
})

// Ouvindo um emoji específico
bot.hears('💪', ctx => {
    ctx.reply(`Biceps! Digite biceps para obter um treinão completo!`)
})

bot.startPolling()