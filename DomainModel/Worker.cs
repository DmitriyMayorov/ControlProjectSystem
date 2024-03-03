using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomainModel;

public partial class Worker
{
    public int Id { get; set; }

    public string Person { get; set; } = null!;

    public int PassportNum { get; set; }

    public int PassportSeries { get; set; }

    public string Position { get; set; } = null!;

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual ICollection<Task> TaskIdworkerAnalystNavigations { get; set; } = new List<Task>();

    public virtual ICollection<Task> TaskIdworkerCoderNavigations { get; set; } = new List<Task>();

    public virtual ICollection<Task> TaskIdworkerMentorNavigations { get; set; } = new List<Task>();

    public virtual ICollection<Task> TaskIdworkerTesterNavigations { get; set; } = new List<Task>();

    public virtual ICollection<Track> Tracks { get; set; } = new List<Track>();
}
